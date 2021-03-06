const quotes = [
    {
        quotes: "나는 믿음이 존재함을 보여주기 위해 의구심을 보인다",
        author: "로버트 브라우닝",
    },
    {
        quotes: "사람은 누구나 주어진 일과 원하는 것이 있다, 비록 보잘것없을지라도",
        author: "윌리엄 셰익스피어",
    },
    {
        quotes: "성공하기까지는 항상 실패를 거친다",
        author: "미키 루니",
    },
    {
        quotes: "경청할 줄 알면 말이 서투른 사람에게서 조차 이득을 얻게 된다",
        author: "플루타르코스",
    },
    {
        quotes: "인간은 오직 사고의 산물일 뿐이다. 생각하는 대로 되는 법",
        author: "마하트마 간디",
    },
    {
        quotes: "배움은 의무도, 생존도 아니다",
        author: "에드워즈 데밍",
    },
    {
        quotes: "모든 동물이 평등하다. 그러나 어떤 동물은 다른 동물보다 더 평등하다",
        author: "조지 오웰",
    },
    {
        quotes: "교묘한 말과 간사한 외모는 진정한 미덕과는 거리가 멀다",
        author: "공자",
    },
    {
        quotes: "완전한 진실만을 말하는 방법은 두 가지뿐이다. 익명으로 하거나, 유언으로 하거나",
        author: "토머스 소웰",
    },
    {
        quotes: "적나라한 진실만큼 불쾌한 노출은 드물다",
        author: "아그네스 리플라이어",
    },
    {
        quotes: "죽음보다 무서워해야 하는건 죽음에 대한 두려움이다",
        author: "퍼블릴리어스 사이러스",
    },
    {
        quotes: "당신을 만나는 모든 사람이 당신과 헤어질 때는 더 나아지고 더 행복해질 수 있도록 하라",
        author: "마더 테레사",
    },
    {
        quotes: "멀리있는 친구만큼 세상을 넓어 보이게 하는 것은 없다. 그들은 위도와 경도가 된다",
        author: "헨리 데이비드 소로우",
    },
    {
        quotes: "이 사랑의 꽃봉오리는 여름날 바람에 마냥 부풀었다가, 다음 만날 때엔 예쁘게 꽃필 거예요",
        author: "윌리엄 셰익스피어",
    },
    {
        quotes: "이별의 아픔 속에서만 사랑의 깊이를 알게 된다",
        author: "조지 앨리엇",
    },
    {
        quotes: "인간의 감정은 누군가를 만날 때와 헤어질 때 가장 순수하며 가장 빛난다",
        author: "장 폴 리히터",
    }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quotes;
author.innerText = todaysQuote.author;