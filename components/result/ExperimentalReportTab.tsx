import { ColorInfo, PersonalColorResponse } from '@/types/api';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Award,
  BarChart3,
  FlaskConical,
  Grid3x3,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { BarChart, LineChart, StackedBarChart } from 'react-native-chart-kit';
import Svg, {
  Circle,
  Defs,
  Line,
  Polygon,
  Rect,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from 'react-native-svg';

interface ExperimentalReportTabProps {
  colorInfo?: ColorInfo;
  summary?: string;
  analysisData?: PersonalColorResponse;
}

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 60;

// 차트 공통 설정
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#f9fafb',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(152, 16, 250, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: '#E5E7EB',
    strokeWidth: 1,
  },
  propsForLabels: {
    fontSize: 11,
    fontWeight: '600',
  },
};

// 통계 카드
function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: string;
}) {
  return (
    <View className="flex-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <View className="mb-2 flex-row items-center justify-between">
        <View
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}20` }}>
          <View className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        </View>
        {icon && <Text className="text-lg">{icon}</Text>}
      </View>
      <Text className="mb-1 text-xs font-medium text-gray-500">{label}</Text>
      <Text className="text-xl font-bold text-gray-900">{value}</Text>
    </View>
  );
}

// 레이더 차트
function RadarChart({
  data,
  labels,
  size = 280,
}: {
  data: number[];
  labels: string[];
  size?: number;
}) {
  const center = size / 2;
  const radius = size / 2 - 50;
  const levels = 5;

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
    <Svg width={size} height={size}>
      <Defs>
        <SvgLinearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#9810fa" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
        </SvgLinearGradient>
      </Defs>

      {/* 배경 그리드 */}
      {[...Array(levels)].map((_, i) => (
        <Polygon
          key={i}
          points={getLevelPoints(i + 1)}
          fill={i === levels - 1 ? '#F9FAFB' : 'none'}
          stroke="#E5E7EB"
          strokeWidth={i === levels - 1 ? '2' : '1'}
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
            stroke="#D1D5DB"
            strokeWidth="1.5"
            strokeDasharray="4, 4"
          />
        );
      })}

      {/* 데이터 영역 */}
      <Polygon
        points={dataPoints}
        fill="url(#radarGradient)"
        stroke="#9810fa"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 데이터 포인트 */}
      {data.map((value, index) => {
        const point = getPoint(index, value);
        return (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#9810fa"
            stroke="#ffffff"
            strokeWidth="2"
          />
        );
      })}

      {/* 레이블 */}
      {labels.map((label, index) => {
        const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
        const labelRadius = radius + 30;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);

        return (
          <SvgText
            key={index}
            x={x}
            y={y}
            fontSize="13"
            fontWeight="700"
            fill="#374151"
            textAnchor="middle"
            alignmentBaseline="middle">
            {label}
          </SvgText>
        );
      })}
    </Svg>
  );
}

// 히트맵 차트
function HeatMapChart({ data }: { data: { label: string; values: number[] }[] }) {
  const cellSize = 50;
  const width = cellSize * 4 + 100;
  const height = cellSize * data.length + 40;
  const maxValue = Math.max(...data.flatMap((d) => d.values));

  const getColor = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.75) return '#9810fa';
    if (intensity > 0.5) return '#c084fc';
    if (intensity > 0.25) return '#e9d5ff';
    return '#f3e8ff';
  };

  return (
    <Svg width={width} height={height}>
      {/* 열 레이블 */}
      {['봄', '여름', '가을', '겨울'].map((label, i) => (
        <SvgText
          key={i}
          x={100 + i * cellSize + cellSize / 2}
          y={20}
          fontSize="12"
          fontWeight="600"
          fill="#374151"
          textAnchor="middle">
          {label}
        </SvgText>
      ))}

      {/* 히트맵 셀 */}
      {data.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {/* 행 레이블 */}
          <SvgText
            x={10}
            y={40 + rowIndex * cellSize + cellSize / 2}
            fontSize="12"
            fontWeight="600"
            fill="#374151">
            {row.label}
          </SvgText>

          {/* 셀 */}
          {row.values.map((value, colIndex) => (
            <React.Fragment key={colIndex}>
              <Rect
                x={100 + colIndex * cellSize}
                y={30 + rowIndex * cellSize}
                width={cellSize - 2}
                height={cellSize - 2}
                fill={getColor(value)}
                rx={4}
              />
              <SvgText
                x={100 + colIndex * cellSize + cellSize / 2}
                y={30 + rowIndex * cellSize + cellSize / 2 + 5}
                fontSize="11"
                fontWeight="700"
                fill="#ffffff"
                textAnchor="middle">
                {value}%
              </SvgText>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Svg>
  );
}

export default function ExperimentalReportTab({
  colorInfo,
  summary,
  analysisData,
}: ExperimentalReportTabProps) {
  // 계절별 점수
  const seasonalScores = analysisData
    ? [
        Math.round(analysisData.image.probs.spring * 100),
        Math.round(analysisData.image.probs.summer * 100),
        Math.round(analysisData.image.probs.autumn * 100),
        Math.round(analysisData.image.probs.winter * 100),
      ]
    : [25, 25, 25, 25];

  const maxScore = Math.max(...seasonalScores);
  const minScore = Math.min(...seasonalScores);
  const avgScore = seasonalScores.reduce((a, b) => a + b, 0) / 4;

  // 부위별 계절 분석 (각 부위마다 다른 계절 선호도)
  const featureAnalysis = {
    labels: ['봄', '여름', '가을', '겨울'],
    datasets: [
      {
        data: analysisData
          ? [
              Math.round(analysisData.image.probs.spring * 100),
              Math.round(analysisData.image.probs.summer * 100),
              Math.round(analysisData.image.probs.autumn * 100),
              Math.round(analysisData.image.probs.winter * 100),
            ]
          : [25, 25, 25, 25],
        color: (opacity = 1) => `rgba(152, 16, 250, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: analysisData
          ? [
              Math.round(analysisData.lip.probs.spring * 100),
              Math.round(analysisData.lip.probs.summer * 100),
              Math.round(analysisData.lip.probs.autumn * 100),
              Math.round(analysisData.lip.probs.winter * 100),
            ]
          : [20, 30, 25, 25],
        color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: analysisData
          ? [
              Math.round(analysisData.eye.probs.spring * 100),
              Math.round(analysisData.eye.probs.summer * 100),
              Math.round(analysisData.eye.probs.autumn * 100),
              Math.round(analysisData.eye.probs.winter * 100),
            ]
          : [30, 20, 25, 25],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ['전체 이미지', '입술', '눈동자'],
  };

  // 스택 바 차트 데이터
  const stackedData = {
    labels: ['전체', '입술', '눈동자'],
    legend: ['봄', '여름', '가을', '겨울'],
    data: analysisData
      ? [
          [
            analysisData.image.probs.spring * 100,
            analysisData.image.probs.summer * 100,
            analysisData.image.probs.autumn * 100,
            analysisData.image.probs.winter * 100,
          ],
          [
            analysisData.lip.probs.spring * 100,
            analysisData.lip.probs.summer * 100,
            analysisData.lip.probs.autumn * 100,
            analysisData.lip.probs.winter * 100,
          ],
          [
            analysisData.eye.probs.spring * 100,
            analysisData.eye.probs.summer * 100,
            analysisData.eye.probs.autumn * 100,
            analysisData.eye.probs.winter * 100,
          ],
        ]
      : [
          [25, 25, 25, 25],
          [25, 25, 25, 25],
          [25, 25, 25, 25],
        ],
    barColors: ['#FF9A9E', '#A1C4FD', '#FBC2EB', '#A18CD1'],
  };

  // 히트맵 데이터
  const heatMapData = analysisData
    ? [
        {
          label: '전체',
          values: [
            Math.round(analysisData.image.probs.spring * 100),
            Math.round(analysisData.image.probs.summer * 100),
            Math.round(analysisData.image.probs.autumn * 100),
            Math.round(analysisData.image.probs.winter * 100),
          ],
        },
        {
          label: '입술',
          values: [
            Math.round(analysisData.lip.probs.spring * 100),
            Math.round(analysisData.lip.probs.summer * 100),
            Math.round(analysisData.lip.probs.autumn * 100),
            Math.round(analysisData.lip.probs.winter * 100),
          ],
        },
        {
          label: '눈동자',
          values: [
            Math.round(analysisData.eye.probs.spring * 100),
            Math.round(analysisData.eye.probs.summer * 100),
            Math.round(analysisData.eye.probs.autumn * 100),
            Math.round(analysisData.eye.probs.winter * 100),
          ],
        },
      ]
    : [
        { label: '전체', values: [25, 25, 25, 25] },
        { label: '입술', values: [20, 30, 25, 25] },
        { label: '눈동자', values: [30, 20, 25, 25] },
      ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-5 pb-10 pt-6">
        {/* 헤더 */}
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
              <FlaskConical size={24} color="#9810fa" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-gray-900">분석 보고서</Text>
              <Text className="text-sm text-gray-500">Personal Color Analysis</Text>
            </View>
          </View>
        </View>

        {/* Executive Summary */}
        <View className="mb-5 overflow-hidden rounded-3xl">
          <LinearGradient
            colors={['#f3e8ff', '#fce7f3', '#fff7ed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-8">
            <View className="mb-4 flex-row items-center gap-2">
              <Sparkles size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">Executive Summary</Text>
            </View>

            <Text className="mb-2 text-xl font-bold text-gray-800">
              {colorInfo?.colorType || '가을 웜뮤트'}
            </Text>
            <Text className="mb-4 text-sm leading-6 text-gray-600">
              {summary || '따뜻한 톤의 색상이 가장 잘 어울리는 타입입니다.'}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Text className="text-xs font-bold text-purple-700">최고 {maxScore}%</Text>
              </View>
              <View className="rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Text className="text-xs font-bold text-purple-700">
                  평균 {avgScore.toFixed(1)}%
                </Text>
              </View>
              <View className="rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Text className="text-xs font-bold text-purple-700">최저 {minScore}%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 통계 카드 그리드 */}
        <View className="mb-5 flex-row gap-3">
          <StatCard
            label="주요 계절"
            value={colorInfo?.colorType.split(' ')[0] || '가을'}
            color="#9810fa"
            icon="🎨"
          />
          <StatCard label="명도" value="Medium" color="#f59e0b" icon="☀️" />
          <StatCard label="채도" value="Muted" color="#10b981" icon="🎭" />
        </View>

        {/* 계절별 적합도 - Bar Chart */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <View className="border-b border-gray-100 p-5 pb-4">
            <View className="flex-row items-center gap-2">
              <BarChart3 size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">계절별 종합 분석</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Seasonal Compatibility Analysis</Text>
          </View>
          <View className="items-center p-4">
            <BarChart
              data={{
                labels: ['봄', '여름', '가을', '겨울'],
                datasets: [{ data: seasonalScores }],
              }}
              width={chartWidth}
              height={240}
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={{
                ...chartConfig,
                barPercentage: 0.7,
                fillShadowGradient: '#9810fa',
                fillShadowGradientOpacity: 1,
              }}
              style={{ borderRadius: 16 }}
              showValuesOnTopOfBars
              fromZero
            />
          </View>
        </View>

        {/* 부위별 히트맵 */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <View className="border-b border-gray-100 p-5 pb-4">
            <View className="flex-row items-center gap-2">
              <Grid3x3 size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">부위별 계절 히트맵</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Feature-Season Heatmap</Text>
          </View>
          <View className="items-center p-4">
            <HeatMapChart data={heatMapData} />
          </View>
        </View>

        {/* 부위별 비교 - Line Chart */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <View className="border-b border-gray-100 p-5 pb-4">
            <View className="flex-row items-center gap-2">
              <TrendingUp size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">부위별 트렌드 비교</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Feature Trend Comparison</Text>
          </View>
          <View className="items-center p-4">
            <LineChart
              data={featureAnalysis}
              width={chartWidth}
              height={240}
              chartConfig={{
                ...chartConfig,
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                },
              }}
              bezier
              style={{ borderRadius: 16 }}
              withInnerLines
              withVerticalLines
              withHorizontalLines
            />
          </View>
        </View>

        {/* 스택 바 차트 */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <View className="border-b border-gray-100 p-5 pb-4">
            <View className="flex-row items-center gap-2">
              <Layers size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">부위별 계절 분포</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Stacked Distribution by Feature</Text>
          </View>
          <View className="items-center p-4">
            <StackedBarChart
              data={stackedData}
              width={chartWidth}
              height={240}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              hideLegend={false}
            />
          </View>
        </View>

        {/* 종합 레이더 차트 */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <View className="border-b border-gray-100 p-5 pb-4">
            <View className="flex-row items-center gap-2">
              <Award size={20} color="#9810fa" />
              <Text className="text-lg font-bold text-gray-900">종합 레이더 분석</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Comprehensive Radar Chart</Text>
          </View>
          <View className="items-center p-5">
            <RadarChart data={seasonalScores} labels={['봄', '여름', '가을', '겨울']} />
            <View className="mt-4 flex-row flex-wrap justify-center gap-2">
              {['봄', '여름', '가을', '겨울'].map((label, index) => (
                <View
                  key={index}
                  className="flex-row items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5">
                  <View
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: ['#FF9A9E', '#A1C4FD', '#FBC2EB', '#A18CD1'][index],
                    }}
                  />
                  <Text className="text-xs font-semibold text-gray-700">
                    {label} {seasonalScores[index]}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 색상 팔레트 */}
        <View className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <Text className="mb-4 text-lg font-bold text-gray-900">추천 색상 팔레트</Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {(colorInfo?.bestColors || ['#edb98d', '#cd853f', '#c19b6c', '#b9966a', '#deb988']).map(
              (color, index) => (
                <View key={index} className="items-center">
                  <View
                    className="mb-2 h-16 w-16 rounded-2xl border-2 border-white shadow-lg"
                    style={{ backgroundColor: color }}
                  />
                  <Text className="text-xs font-medium text-gray-600">#{index + 1}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* 전문가 추천 */}
        <View className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <Text className="mb-4 text-lg font-bold text-gray-900">전문가 추천사항</Text>
          <View className="gap-3">
            <View className="rounded-2xl bg-green-50 p-4">
              <Text className="mb-2 text-sm font-bold text-green-900">✓ 추천 색상</Text>
              <Text className="text-sm leading-6 text-green-800">
                따뜻한 톤의 베이지, 카키, 브라운 계열을 메인 컬러로 활용하세요. 자연스러운 색감이
                피부를 환하게 만들어줍니다.
              </Text>
            </View>
            <View className="rounded-2xl bg-red-50 p-4">
              <Text className="mb-2 text-sm font-bold text-red-900">✗ 피해야 할 색상</Text>
              <Text className="text-sm leading-6 text-red-800">
                차가운 톤의 그레이, 블랙, 네이비는 피부를 칙칙해 보이게 할 수 있습니다. 너무 선명한
                원색도 피하는 것이 좋습니다.
              </Text>
            </View>
            <View className="rounded-2xl bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-bold text-blue-900">💡 스타일링 팁</Text>
              <Text className="text-sm leading-6 text-blue-800">
                골드 톤의 액세서리와 자연스러운 메이크업이 잘 어울립니다. 립 컬러는 코랄이나 피치
                톤을 추천합니다.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
