#!/bin/bash

# =============================================================================
# 分支合并规则检查脚本
# =============================================================================
# 
# 用于在 GitHub Actions 中检查 Pull Request 的分支合并规则
# 只检查分支合并是否符合规范，分支名和提交消息检查由 Husky 处理
#
# 使用方法:
#   ./scripts/branch-protection.sh
#
# 环境变量:
#   GITHUB_HEAD_REF: 源分支名 (由 GitHub Actions 自动设置)
#   GITHUB_BASE_REF: 目标分支名 (由 GitHub Actions 自动设置)
#
# =============================================================================

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 获取分支信息
get_branch_info() {
    if [ -n "$GITHUB_HEAD_REF" ] && [ -n "$GITHUB_BASE_REF" ]; then
        # GitHub Actions 环境
        SOURCE_BRANCH="$GITHUB_HEAD_REF"
        TARGET_BRANCH="$GITHUB_BASE_REF"
        IS_PR=true
    else
        # 本地环境，无法进行合并规则检查
        print_warning "本地环境，无法进行分支合并规则检查"
        print_info "分支合并规则检查仅在 Pull Request 中执行"
        exit 0
    fi
}

# 检查分支合并规则
check_branch_protection() {
    local source_branch="$1"
    local target_branch="$2"
    
    print_info "检查分支合并规则..."
    print_info "源分支: $source_branch"
    print_info "目标分支: $target_branch"
    
    case "$target_branch" in
        "main")
            # main 分支只允许 dev、fix_xxx、hotfix_xxx 分支合并
            if [[ "$source_branch" =~ ^(dev|fix_.+|hotfix_.+)$ ]]; then
                print_success "分支合并规则检查通过"
                print_info "规则说明: main 分支只允许 dev、fix_xxx、hotfix_xxx 分支合并"
                return 0
            else
                print_error "分支合并规则检查失败"
                print_error "$source_branch 分支不能合并到 $target_branch 分支"
                print_info "规则说明: main 分支只允许 dev、fix_xxx、hotfix_xxx 分支合并"
                print_info "允许的分支模式: dev, fix_*, hotfix_*"
                return 1
            fi
            ;;
        "dev")
            # dev 分支允许 dev_xxx、feature_xxx、feat_xxx 等分支合并
            if [[ "$source_branch" =~ ^(dev_.+|feature_.+|feat_.+)$ ]]; then
                print_success "分支合并规则检查通过"
                print_info "规则说明: dev 分支允许 dev_xxx、feature_xxx、feat_xxx 分支合并"
                return 0
            else
                print_error "分支合并规则检查失败"
                print_error "$source_branch 分支不能合并到 $target_branch 分支"
                print_info "规则说明: dev 分支允许 dev_xxx、feature_xxx、feat_xxx 分支合并"
                print_info "允许的分支模式: dev_*, feature_*, feat_*"
                return 1
            fi
            ;;
        *)
            print_warning "目标分支 $target_branch 没有配置保护规则，允许合并"
            return 0
            ;;
    esac
}

# 生成检查结果报告
generate_report() {
    local branch_result="$1"
    
    if [ "$IS_PR" = false ]; then
        return 0
    fi
    
    # 创建报告文件
    local report_file="/tmp/branch-protection-report.json"
    
    cat > "$report_file" << EOF
{
  "source_branch": "$SOURCE_BRANCH",
  "target_branch": "$TARGET_BRANCH",
  "branch_check": {
    "result": "$([ "$branch_result" -eq 0 ] && echo "success" || echo "failure")",
    "message": "$([ "$branch_result" -eq 0 ] && echo "分支合并规则检查通过" || echo "分支合并规则检查失败")"
  },
  "overall_result": "$([ "$branch_result" -eq 0 ] && echo "success" || echo "failure")",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
    
    # 输出报告内容（GitHub Actions 可以通过 $GITHUB_OUTPUT 获取）
    if [ -n "$GITHUB_OUTPUT" ]; then
        echo "report<<EOF" >> "$GITHUB_OUTPUT"
        cat "$report_file" >> "$GITHUB_OUTPUT"
        echo "EOF" >> "$GITHUB_OUTPUT"
    fi
    
    print_info "检查报告已生成: $report_file"
}

# 主函数
main() {
    print_info "开始分支合并规则检查..."
    
    # 获取分支信息
    get_branch_info
    
    if [ -z "$SOURCE_BRANCH" ]; then
        print_error "无法获取源分支信息"
        exit 1
    fi
    
    if [ "$IS_PR" = true ] && [ -z "$TARGET_BRANCH" ]; then
        print_error "无法获取目标分支信息"
        exit 1
    fi
    
    # 执行分支合并规则检查
    local branch_result=0
    
    if [ "$IS_PR" = true ]; then
        if ! check_branch_protection "$SOURCE_BRANCH" "$TARGET_BRANCH"; then
            branch_result=1
        fi
    fi
    
    # 生成报告
    generate_report "$branch_result"
    
    # 输出最终结果
    if [ $branch_result -eq 0 ]; then
        print_success "分支合并规则检查通过！"
        exit 0
    else
        print_error "分支合并规则检查失败，请检查分支命名规范"
        exit 1
    fi
}

# 执行主函数
main "$@"
