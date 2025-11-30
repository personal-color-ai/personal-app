import { View, Text } from 'react-native';
import { ColorInfo, PersonalColorResponse } from '@/types/api';
import Svg, { Polygon, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

interface OverviewTabProps {
  colorInfo?: ColorInfo;
  summary?: string;
  analysisData?: PersonalColorResponse;
}

// 레이더 차트 컴포넌트
function RadarChart({
  data,
  labels,
  colors,
  size = 300,
  gradientId,
  gradientColors,
  strokeColor,
}: {
  data: number[];
  labels: string[];
  colors: string[];
  size?: number;
  gradientId: string;
  gradientColors: string[];
  strokeColor: string;
}) {
  const center = size / 2;
  const radius = size / 2 - 40; // 레이블 공간 확보
  const levels = 4; // 레벨 수 줄임 (더 깔끔하게)

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLevelPoints = (level: number) => {
    const points = data.map((_, index) => {
      const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
      const r = (radius * level) / levels;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return points.join(' ');
  };

  const dataPoints = data
    .map((value, index) => {
      const point = getPoint(index, value);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <View style={{ alignItems: 'center', marginVertical: 0 }}>
      <View>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={gradientColors[0]} stopOpacity="0.9" />
              <Stop offset="100%" stopColor={gradientColors[1]} stopOpacity="0.4" />
            </LinearGradient>
          </Defs>

          {/* 배경 그리드 */}
          {[...Array(levels)].map((_, i) => (
            <Polygon
              key={i}
              points={getLevelPoints(i + 1)}
              fill={i === levels - 1 ? '#F9FAFB' : 'none'}
              stroke="#E5E7EB"
              strokeWidth={i === levels - 1 ? '1.5' : '1'}
              strokeDasharray={i === levels - 1 ? '' : '4, 4'}
            />
          ))}

          {/* 축 라인 */}
          {data.map((_, index) => {
            const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);
            return (
              <Line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="4, 4"
              />
            );
          })}

          {/* 데이터 영역 */}
          <Polygon
            points={dataPoints}
            fill={`url(#${gradientId})`}
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 레이블 */}
          {labels.map((label, index) => {
            const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
            const labelRadius = radius + 24;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);

            return (
              <SvgText
                key={index}
                x={x}
                y={y}
                fontSize="15"
                fontWeight="700"
                fill="#4B5563"
                textAnchor="middle"
                alignmentBaseline="middle">
                {label}
              </SvgText>
            );
          })}
        </Svg>
      </View>

      {/* 하단 퍼센트 정보 카드 */}
      <View className="mt-2 w-full flex-row flex-wrap justify-center gap-3 px-2">
        {labels.map((label, index) => (
          <View
            key={index}
            className="flex-row items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5">
            <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index] }} />
            <Text className="text-[13px] font-bold text-gray-600">
              {label} <Text className="text-black">{data[index]}%</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function AnalysisChart({
  title,
  result,
  probs,
  badgeColor,
  badgeBg,
  chartTheme,
}: {
  title: string;
  result: string;
  probs: { spring: number; summer: number; autumn: number; winter: number };
  badgeColor: string;
  badgeBg: string;
  chartTheme: {
    gradientId: string;
    gradientColors: string[];
    strokeColor: string;
  };
}) {
  // 계절별 대표 색상
  const colors = ['#FF9A9E', '#A1C4FD', '#FBC2EB', '#A18CD1'];
  const labels = ['봄', '여름', '가을', '겨울'];
  const data = [
    Math.round(probs.spring * 100),
    Math.round(probs.summer * 100),
    Math.round(probs.autumn * 100),
    Math.round(probs.winter * 100),
  ];

  return (
    <View className="mb-[20px] overflow-hidden rounded-[24px] border border-gray-100 bg-white p-[20px] shadow-sm">
      <View className="mb-[10px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-[18px] font-bold text-gray-900">{title}</Text>
        </View>
        <View className="rounded-full px-[12px] py-[6px]" style={{ backgroundColor: badgeBg }}>
          <Text className="text-[13px] font-bold" style={{ color: badgeColor }}>
            {result.toUpperCase()}
          </Text>
        </View>
      </View>
      <View className="items-center">
        <RadarChart
          data={data}
          labels={labels}
          colors={colors}
          gradientId={chartTheme.gradientId}
          gradientColors={chartTheme.gradientColors}
          strokeColor={chartTheme.strokeColor}
        />
      </View>
    </View>
  );
}

export default function OverviewTab({ colorInfo, summary, analysisData }: OverviewTabProps) {
  const colorType = colorInfo?.colorType || '가을 웜뮤트';
  const features = [
    '따뜻한 언더톤의 피부',
    '부드러운 인상',
    '차분한 색감이 잘 어울림',
    '자연스러운 메이크업 추천',
  ];

  return (
    <>
      {summary && (
        <View className="mt-[18px] px-[30px]">
          <View className="rounded-[12px] border border-neutral-200 bg-white p-[20px]">
            <Text className="text-[16px] font-medium leading-[24px] text-[#475161]">{summary}</Text>
          </View>
        </View>
      )}

      <View className="mt-[18px] px-[30px]">
        <View className="rounded-[12px] border border-[#fee685] bg-[#fff9ed] p-[20px]">
          <View className="flex-row items-center gap-[16px]">
            <View className="relative h-[60px] w-[60px]">
              <View className="h-[60px] w-[60px] rounded-full bg-[#f2c296]" />
              <View className="absolute left-[11px] top-[7px] h-[53px] w-[39px] rounded-full bg-[#d4a574]" />
            </View>

            <View className="flex-1">
              <Text className="mb-[8px] text-[20px] font-medium text-black">{colorType}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-[18px] px-[30px]">
        <View className="rounded-[12px] border border-neutral-200 bg-white p-[20px]">
          <Text className="mb-[16px] text-[18px] font-semibold text-black">주요 특징</Text>
          <View className="gap-[9px]">
            {features.map((text, index) => (
              <View key={index} className="flex-row items-center gap-[8px]">
                <View className="h-[19px] w-[19px] items-center justify-center rounded-full bg-[#9810fa]">
                  <View className="h-[10px] w-[10px] rounded-full bg-white" />
                </View>
                <Text className="text-[16px] font-medium text-[#475161]">{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {analysisData && (
        <View className="mt-[24px] px-[30px]">
          <Text className="mb-[20px] text-[20px] font-bold text-black">상세 분석 결과</Text>

          <AnalysisChart
            title="전체 이미지 분석"
            result={analysisData.image.result}
            probs={analysisData.image.probs}
            badgeColor="#7c3aed"
            badgeBg="#ede9fe"
            chartTheme={{
              gradientId: 'grad_image',
              gradientColors: ['#8B5CF6', '#C4B5FD'], // Violet
              strokeColor: '#7C3AED',
            }}
          />

          <AnalysisChart
            title="입술 분석"
            result={analysisData.lip.result}
            probs={analysisData.lip.probs}
            badgeColor="#be123c"
            badgeBg="#ffe4e6"
            chartTheme={{
              gradientId: 'grad_lip',
              gradientColors: ['#F43F5E', '#FDA4AF'], // Rose
              strokeColor: '#E11D48',
            }}
          />

          <AnalysisChart
            title="눈동자 분석"
            result={analysisData.eye.result}
            probs={analysisData.eye.probs}
            badgeColor="#1d4ed8"
            badgeBg="#dbeafe"
            chartTheme={{
              gradientId: 'grad_eye',
              gradientColors: ['#3B82F6', '#93C5FD'], // Blue
              strokeColor: '#2563EB',
            }}
          />
        </View>
      )}
    </>
  );
}
