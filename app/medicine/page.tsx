'use client';
import { useState } from 'react';
import { Search, Pill, AlertTriangle, Info } from 'lucide-react';

interface DrugItem {
  name: string;
  company: string;
  efcy: string;
  atpn: string;
  intrc: string;
  se: string;
}

export default function MedicinePage() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<DrugItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [notReady, setNotReady] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = query.trim();
    if (!name || loading) return;
    setLoading(true);
    setSearched(true);
    setNotReady(false);
    try {
      const res = await fetch(`/api/drug?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      setItems(data.items || []);
      setNotReady(Boolean(data.notReady));
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <a href="/" className="text-lg md:text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</a>
        <a href="/mbti" className="text-sm" style={{ color: '#9C7B6B' }}>건강 MBTI →</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-5" style={{ backgroundColor: '#E8DDD6', color: '#7A5C4E' }}>
          식약처 공공데이터 연동
        </span>
        <h1 className="text-2xl md:text-4xl font-bold leading-snug mb-3 whitespace-nowrap" style={{ color: '#3B2314' }}>
          복용 중인 약, 안전하게 확인하세요
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: '#7A5C4E' }}>
          약 이름을 검색하면 식약처 e약은요 정보를 실시간으로 보여드려요.
        </p>

        <form onSubmit={search} className="flex gap-2 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: 타이레놀, 아스피린"
            className="flex-1 px-4 py-4 rounded-2xl text-sm md:text-base outline-none"
            style={{ backgroundColor: '#FFFCF9', color: '#3B2314', border: '1px solid #E8DDD6' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 md:px-7 py-4 rounded-2xl font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            <Search size={18} />
            <span className="hidden md:inline">검색</span>
          </button>
        </form>

        {loading && <p className="text-center py-12" style={{ color: '#9C7B6B' }}>식약처에서 조회 중...</p>}

        {!loading && notReady && (
          <div className="rounded-2xl p-6 text-sm leading-relaxed" style={{ backgroundColor: '#F2EBE3', color: '#7A5C4E' }}>
            의약품 데이터 연동을 준비 중이에요. (식약처 공공데이터 활용신청 승인 대기)
          </div>
        )}

        {!loading && searched && !notReady && items.length === 0 && (
          <p className="text-center py-12" style={{ color: '#9C7B6B' }}>검색 결과가 없어요. 약 이름을 다시 확인해주세요.</p>
        )}

        <div className="space-y-4">
          {items.map((d, i) => {
            const open = openIdx === i;
            const clamp = open ? '' : 'line-clamp-2';
            const hasLong = (d.efcy + d.intrc + d.atpn).length > 120;
            return (
              <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6' }}>
                <div className="flex items-center gap-2.5 mb-1">
                  <Pill size={20} strokeWidth={1.5} style={{ color: '#5C3D2E' }} className="flex-shrink-0" />
                  <p className="font-bold text-lg" style={{ color: '#3B2314' }}>{d.name}</p>
                </div>
                {d.company && <p className="text-xs mb-4 ml-7" style={{ color: '#9C7B6B' }}>{d.company}</p>}

                {d.efcy && (
                  <div className="mb-3 ml-7">
                    <p className="text-xs font-bold mb-1" style={{ color: '#9C7B6B' }}>효능</p>
                    <p className={`text-sm leading-relaxed ${clamp}`} style={{ color: '#3B2314' }}>{d.efcy}</p>
                  </div>
                )}
                {d.intrc && (
                  <div className="mb-3 ml-7 p-3 rounded-xl" style={{ backgroundColor: '#FBF1EC' }}>
                    <p className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: '#B45309' }}>
                      <AlertTriangle size={13} /> 함께 주의할 약·음식
                    </p>
                    <p className={`text-sm leading-relaxed ${clamp}`} style={{ color: '#7A5C4E' }}>{d.intrc}</p>
                  </div>
                )}
                {d.atpn && (
                  <div className="ml-7">
                    <p className="text-xs font-bold mb-1" style={{ color: '#9C7B6B' }}>주의사항</p>
                    <p className={`text-sm leading-relaxed ${clamp}`} style={{ color: '#7A5C4E' }}>{d.atpn}</p>
                  </div>
                )}

                {hasLong && (
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="text-xs font-medium mt-3 ml-7 hover:opacity-70 transition-opacity"
                    style={{ color: '#5C3D2E' }}
                  >
                    {open ? '접기 ▲' : '더보기 ▼'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="flex items-start gap-2 mt-8 p-4 rounded-2xl" style={{ backgroundColor: '#F2EBE3' }}>
            <Info size={16} strokeWidth={2} style={{ color: '#9C7B6B' }} className="flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed" style={{ color: '#7A5C4E' }}>
              식품의약품안전처 의약품개요정보(e약은요) 제공 자료입니다. 영양제와의 병용 가능 여부 등 개인별 판단은 의사·약사와 상담하세요. 본 정보는 진단·처방을 대신하지 않습니다.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
