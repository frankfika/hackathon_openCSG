(function(){
  // 倒计时（以建议日期为例）
  var target = new Date('2025-11-15T00:00:00+08:00').getTime();
  var el = document.getElementById('countdown');
  function tick(){
    if(!el) return;
    var now = Date.now();
    var diff = target - now;
    if(diff <= 0){ el.textContent = '报名进行中'; return; }
    var d = Math.floor(diff/86400000);
    var h = Math.floor((diff%86400000)/3600000);
    var m = Math.floor((diff%3600000)/60000);
    el.textContent = '距开赛 '+d+' 天 '+h+' 小时 '+m+' 分钟';
  }
  tick();
  setInterval(tick, 60000);

  // 移动端导航
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var shown = links.style.display === 'flex';
      links.style.display = shown ? 'none' : 'flex';
    });
  }

  // 平滑滚动与关闭菜单
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = this.getAttribute('href');
      if(id.length > 1){
        e.preventDefault();
        var el = document.querySelector(id);
        if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
        if(links){ links.style.display = 'none'; }
      }
    });
  });

  // FAQ 手风琴
  document.querySelectorAll('.acc-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var panel = this.nextElementSibling;
      var open = panel.style.display === 'block';
      panel.style.display = open ? 'none' : 'block';
    });
  });

  // Refer 榜（示例数据）
  var refer = document.getElementById('refer-list');
  if(refer){
    var data = [
      {name:'@alpha', reward:'70 USDT'},
      {name:'@beta', reward:'20 USDT'},
      {name:'@gamma', reward:'10 USDT'}
    ];
    refer.innerHTML = data.map(function(x){
      return '<li><span>'+x.name+'</span><span>'+x.reward+'</span></li>'
    }).join('');
  }

  // 读取 UTM/邀请参数（示例）
  var params = new URLSearchParams(location.search);
  var ref = params.get('ref');
  if(ref){
    try{ sessionStorage.setItem('ref', ref); }catch(e){}
  }

  // 视差/显隐动画
  var toReveal = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function onScroll(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    toReveal.forEach(function(el){
      if(el.classList.contains('revealed')) return;
      var rect = el.getBoundingClientRect();
      if(rect.top < vh - 60){ el.classList.add('revealed'); }
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // 一句话生成 Agent（前端占位，纯本地）
  var agentForm = document.getElementById('agent-form');
  var agentOutput = document.getElementById('agent-output');
  var agentEdit = document.getElementById('agent-edit');
  var agentSubmit = document.getElementById('agent-submit');
  if(agentForm && agentOutput){
    agentForm.addEventListener('submit', function(e){
      e.preventDefault();
      var v = (document.getElementById('one-liner')||{}).value||'';
      if(!v.trim()){ agentOutput.textContent = '请先填写一句话'; return; }
      var tpl = {
        title: '基于你的目标的 Agent',
        goal: v.trim(),
        input: ['原始输入文本'],
        steps: ['解析输入与边界','生成候选输出','校验格式与安全边界','输出最终结果'],
        output: '分段 Markdown/JSON（含字段说明）',
        params: { temperature: 0.3, max_tokens: '适中' }
      };
      try{ sessionStorage.setItem('agentDraft', JSON.stringify(tpl)); }catch(_){}
      agentOutput.textContent = JSON.stringify(tpl, null, 2);
    });
  }
  if(agentEdit){ agentEdit.addEventListener('click', function(e){ e.preventDefault(); alert('自定义面板占位：未来接入高级字段与工具配置。'); }); }
  if(agentSubmit){ agentSubmit.addEventListener('click', function(e){ e.preventDefault(); alert('提交占位：未来接入后端 API 提交与校验。'); }); }
})();

