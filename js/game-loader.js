/**
 * 游戏加载器脚本
 * 处理游戏 iframe 的加载、错误检测和替代方案显示
 */

// 当页面加载完成后执行
window.addEventListener('load', function() {
    // 获取必要的 DOM 元素
    const gameFrame = document.getElementById('gameFrame');
    const loading = document.getElementById('loading');
    const errorContainer = document.getElementById('errorContainer');
    
    // 如果找不到必要的元素，则退出
    if (!gameFrame || !loading || !errorContainer) {
        console.error('找不到必要的 DOM 元素，请确保页面中包含 id 为 gameFrame、loading 和 errorContainer 的元素');
        return;
    }
    
    // 设置超时，如果 5 秒后 iframe 仍未加载完成，显示错误信息
    setTimeout(function() {
        loading.style.display = 'none';
        errorContainer.style.display = 'flex';
    }, 5000);
    
    // 尝试检测 iframe 加载错误
    gameFrame.onerror = function() {
        loading.style.display = 'none';
        errorContainer.style.display = 'flex';
    };
    
    // 监听 iframe 加载完成事件
    gameFrame.onload = function() {
        loading.style.display = 'none';
        
        // 尝试检测 iframe 内容是否被阻止
        try {
            // 如果无法访问 iframe 内容，可能会抛出错误
            const frameContent = gameFrame.contentWindow.document;
            if (!frameContent) {
                errorContainer.style.display = 'flex';
            }
        } catch (e) {
            // 如果出现跨域错误，显示错误信息
            errorContainer.style.display = 'flex';
        }
    };
    
    // 添加重试按钮功能
    const retryButton = document.getElementById('retryButton');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            // 隐藏错误容器，显示加载动画
            errorContainer.style.display = 'none';
            loading.style.display = 'flex';
            
            // 重新加载 iframe
            gameFrame.src = gameFrame.src;
            
            // 设置新的超时
            setTimeout(function() {
                loading.style.display = 'none';
                errorContainer.style.display = 'flex';
            }, 5000);
        });
    }
}); 