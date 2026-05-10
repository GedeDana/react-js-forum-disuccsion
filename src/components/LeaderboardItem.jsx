function LeaderboardItem({ image, name, skor }) {
  return (
    <div className="flex gap-2 border-b border-slate-20">
      <img src={image} className="py-2 pr-3" />
      <label className="flex-3 my-auto">{name}</label>
      <label className="my-auto">{skor}</label>
    </div>
  );
}

export default LeaderboardItem;
