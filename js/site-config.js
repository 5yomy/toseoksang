/* ===========================================================
   토석상 (土石桑) — 펜션 정보
   여기만 고치면 사이트 전체(모든 페이지)에 반영됩니다.

   ※ 아래 값 중 네이버 검색으로 찾아 넣은 것은 [확인] 표시를 해두었습니다.
      실제와 다르면 수정해 주세요.
   =========================================================== */

window.SITE = {
  // ── 이름 ──────────────────────────────────────────────
  name:        '토석상',
  nameCn:      '土石桑',              // 흙 토 · 돌 석 · 뽕나무 상
  nameEn:      'TOSEOKSANG',
  tagline:     '흙과 돌과 뽕나무로 지은 집',

  // ── 연락처 ────────────────────────────────────────────
  phone:       '0507-1373-4052',      // [확인]
  naverMapUrl: 'https://map.naver.com/p/entry/place/1817210374',  // 네이버 지도 토석상 장소 페이지
  blogUrl:     'https://blog.naver.com/banggok4052',      // [확인] 네이버 블로그
  instaUrl:    'https://www.instagram.com/tosuksang/',    // [확인] 인스타그램
  youtubeUrl:  'https://youtu.be/zSuOnKmabpQ',            // 공간 구경 영상

  // ── 예약 ──────────────────────────────────────────────
  // 여기를 비워두면 사이트의 모든 예약 버튼이 '전화걸기'로 동작합니다.
  // 나중에 온라인 예약을 다시 받으시려면 아래 주소를 넣으면 됩니다.
  //   온다(ONDA) 예약창 → https://booking.pension.onda.me/137862/calendar
  bookingUrl:  '',

  // ── 주소 ──────────────────────────────────────────────
  address:     '충청북도 단양군 대강면 방곡2길 31-1',        // [확인]
  addressOld:  '충청북도 단양군 대강면 방곡리 175-2',        // [확인] 지번주소
  zipCode:     '27028',                                     // [확인]
  lat:         36.8381266,                                  // [확인] 지도 좌표
  lng:         128.3192673,                                 // [확인]
  region:      '단양 방곡도예촌',

  // ── 사업자 정보 (푸터 표기) ───────────────────────────
  company:     '토석상',
  bizNo:       '661-17-01802',        // [확인] 네이버 예약에 등록된 사업자등록번호

  // ── 입퇴실 ────────────────────────────────────────────
  checkIn:     '15:00',               // [확인]
  checkOut:    '11:00'
};

/* ---- 아래는 손대지 않아도 됩니다 ---- */
(function () {
  var S = window.SITE;

  function fill() {
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var v = S[el.getAttribute('data-site')];
      if (v) el.textContent = v;
    });

    // 전화 링크
    var tel = 'tel:' + S.phone.replace(/[^0-9+]/g, '');
    document.querySelectorAll('[data-tel]').forEach(function (a) { a.href = tel; });

    // 실시간예약 링크 (없으면 전화걸기로 대체)
    document.querySelectorAll('[data-book]').forEach(function (a) {
      if (S.bookingUrl) {
        a.href = S.bookingUrl; a.target = '_blank'; a.rel = 'noopener';
      } else {
        a.href = tel;
      }
    });

    // 카카오 채널 · 블로그 · 인스타그램 (주소 없으면 숨김)
    [['data-navermap', 'naverMapUrl'], ['data-blog', 'blogUrl'], ['data-insta', 'instaUrl'],
     ['data-youtube', 'youtubeUrl']].forEach(function (pair) {
      document.querySelectorAll('[' + pair[0] + ']').forEach(function (a) {
        if (S[pair[1]]) {
          a.href = S[pair[1]]; a.target = '_blank'; a.rel = 'noopener';
        } else {
          a.hidden = true;
        }
      });
    });

    // 지도 앱 열기 링크
    var q = encodeURIComponent(S.name + ' ' + S.address);
    document.querySelectorAll('[data-map]').forEach(function (a) {
      a.href = a.getAttribute('data-map') === 'kakao'
        ? 'https://map.kakao.com/?q=' + q
        : 'https://map.naver.com/p/search/' + q;
    });

    // 주소 복사 버튼
    document.querySelectorAll('[data-copy-addr]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(S.address).then(function () {
          var old = btn.textContent;
          btn.textContent = '복사했습니다';
          setTimeout(function () { btn.textContent = old; }, 1600);
        }, function () {});
      });
    });

    document.title = document.title.replace('{name}', S.name);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fill);
  } else {
    fill();
  }
})();
