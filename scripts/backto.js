hexo.extend.tag.register('backto', function(args){
  const type = (args[0] || '').trim();
  if (type === 'competition') {
    return '<div style="margin-top:40px;"><a href="/2025/01/01/竞赛成果总览/" style="display:inline-block;padding:10px 18px;background:#2f4154;color:#fff;border-radius:8px;text-decoration:none;">← 返回《竞赛成果总览》</a></div>';
  }
  if (type === 'research') {
    return '<div style="margin-top:40px;"><a href="/2025/01/05/科研项目总览/" style="display:inline-block;padding:10px 18px;background:#2f4154;color:#fff;border-radius:8px;text-decoration:none;">← 返回《科研项目总览》</a></div>';
  }
  return '';
}, {ends: false});
