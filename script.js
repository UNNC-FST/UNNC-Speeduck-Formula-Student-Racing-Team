// script.js

// Function to handle smooth scrolling
function scrollToSecmain() {
    // 1. Find the section with id="specs"
    const specsSection = document.getElementById('secmain');
    
    // 2. Use the built-in 'scrollIntoView' method with 'smooth' behavior
    specsSection.scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Optional: Add a scroll listener to change navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    // If we scroll down more than 50px, make navbar solid black
    if (window.scrollY > 50) {
        navbar.style.background = '#000000';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.8)';
    }
});

// 电控的js
function showEl(groupId) {
    // 1. 隐藏所有模块
    const contents = document.querySelectorAll('.el-content');
    contents.forEach(content => content.classList.remove('active'));

    // 2. 取消所有按钮状态
    const buttons = document.querySelectorAll('.el-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. 激活当前选中的模块和按钮
    document.getElementById('el-' + groupId).classList.add('active');
    event.currentTarget.classList.add('active');

    // 4. (可选) 切换时自动滚动到电控区顶部，开始新一页的阅读
    document.getElementById('electric').scrollIntoView({ behavior: 'smooth' });
}
//电控js结束
