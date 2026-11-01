<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin = document.getElementById('voda');
  var flow = document.getElementById('flow'), drop = document.getElementById('drop');
  var items = [].slice.call(document.querySelectorAll('#stList li'));
  var LEN = 0;
  try { LEN = flow.getTotalLength(); } catch(e) { LEN = 0; }
  if (!LEN) LEN = 600;
  flow.setAttribute('stroke-dasharray', '0 ' + LEN);
  function apply(p){
    var d = (p * LEN).toFixed(1);
    flow.setAttribute('stroke-dasharray', d + ' ' + LEN);
    var pt = null;
    try { pt = flow.getPointAtLength(p * LEN); } catch(e) {}
    if (pt) { drop.setAttribute('cx', pt.x.toFixed(1)); drop.setAttribute('cy', pt.y.toFixed(1)); }
    var k = p < .22 ? 0 : (p < .5 ? 1 : (p < .78 ? 2 : 3));
    items.forEach(function(li,i){ li.classList.toggle('on', i === k); });
  }
  if (reduce) { apply(1); return; }
  apply(0);
  var raf = false;
  function upd(){
    raf = false;
    var r = pin.getBoundingClientRect(), span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    apply(p);
  }
  addEventListener('scroll', function(){ if(!raf){raf=true;requestAnimationFrame(upd);} }, {passive:true});
  addEventListener('resize', upd);
  upd();
})();
</script>
</body>
</html>
