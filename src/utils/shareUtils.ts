// SNS共有機能

export const shareToTwitter = (nickname: string, elapsedTime: string) => {
  const text = `「The Unsubscribe」を${elapsedTime}でクリアしました！\nニックネーム: ${nickname}\n\nあなたも退会の困難さを体験してみませんか？`;
  const url = window.location.origin;
  const hashtags = 'TheUnsubscribe,ダークパターン';

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;

  window.open(twitterUrl, '_blank', 'width=550,height=420');
};
