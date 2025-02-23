<template>
  <projectThemeDetailTemplete :timeline-steps="timelineSteps" :timeline-article="timelineArticle" :other-stories="otherStories"></projectThemeDetailTemplete>
</template>

<script setup>
import {ref,onMounted} from "vue"
import projectThemeDetailTemplete from '../components/projectThemeDetailTemplete.vue';
import projectTheme from './projectTheme.vue';
import eventBus from "../eventBus";

const timelineSteps = [
  {
    id: 1,
    title: '阶段一',
    description: '明确测绘任务的目的和范围，收集相关资料，制定技术方案。',
    color: '#C1CDE3'
  },
  {
    id: 2,
    title: '阶段二',
    description: '布设控制网，进行精确测量，获取控制点的坐标和高程数据。',
    color: '#D7D5B4'
  },
  {
    id: 3,
    title: '阶段三',
    description: '对项目区域进行详细测量，获取地物、地貌、建筑物等信息。',
    color: '#DD4D41'
  },
  {
    id: 4,
    title: '阶段四',
    description: '整理测绘数据，制作成果图件，编写测绘报告。',
    color: '#6DC4B2'
  }
];

const timelineArticle = [
  {
    id: 1,
    title: '2025.02.05 前期准备',
    content: '项目团队与杭州临平区理想臻品的客户代表张工、王经理进行了初次会议，明确了项目的总体目标和需求。团队成员收集了该区域的现有测绘资料，包括过去五年的地形数据、建筑规划图和土地利用现状图。为了确保测绘精度，团队制定了初步的测绘技术方案，并讨论了数据采集的方法，如无人机航测与RTK测量的结合方案。会议结束后，技术负责人李明撰写了项目需求分析报告，为后续测绘工作的展开奠定了基础。',
    img: null
  },
  {
    id: 2,
    title: '2025.02.12 控制测量',
    content: '项目团队召开了第二次项目规划会议，由项目经理王丽主持，详细拆解了各阶段的工作内容，并制定了测绘任务分工。数据采集小组由张伟和李晨带队，负责外业数据采集；数据处理小组由陈静和赵磊负责，确保测量数据的正确性和一致性。团队评估了测区内可能存在的挑战，如部分地形较为复杂、建筑密集度较高等问题，并制定了备用方案。项目团队还与杭州市自然资源局取得联系，申请获取最新的土地利用数据，以便进行更精确的比对分析。',
    img: "/projectThemeDetail/plan.webp"
  },
  {
    id: 3,
    title: '2025.03.01 详细测绘',
    content: '项目正式进入实施阶段，测绘团队携带高精度RTK设备、全站仪以及无人机航测设备，开始对临平区理想臻品周边区域进行数据采集。为确保数据的全面性，团队采用了地面测量与空中测绘相结合的方法。第一天的测量任务由李晨负责，他带领小组完成了主要建筑物的高程和边界测量，同时，张伟操控无人机进行大范围航测，并生成了初步的DEM（数字高程模型）。在此过程中，团队发现部分区域存在遮挡，需要补充地面采样点以提高精度。整个测绘工作持续了两周，团队成员每日晚上都会进行数据整理和初步分析，以确保数据质量。',
    img:"/projectThemeDetail/cehui.webp"
  },
  {
    id: 4,
    title: '2025.03.20 数据处理与成果输出',
    content: '经过近一个月的努力，测绘团队顺利完成了数据采集和处理工作。赵磊和陈静负责对所有测绘数据进行统一处理，采用GIS软件进行数据整合，并生成了最终的测绘成果，包括高精度地形图、三维模型、地籍测绘数据等。项目组向客户提交了测绘报告，并与张工、王经理进行了最终成果的汇报会。客户对项目成果表示高度认可，认为本次测绘数据将为后续规划提供重要支撑。最终，团队整理了所有项目文档，并撰写了详细的项目总结报告，记录了测绘过程中遇到的技术难点和优化经验，为未来类似项目提供了宝贵的经验参考。',
    img: null
  }
];


const otherStories = [
  {
    title: "理想臻品(汀山和院)",
    desc: "位于临平区临平山南，紧邻杭州钱江新城和未来科技城，面积约为12.5万平方米",
    img: `/lixiangzhenpin.webp`,
    route:"/liXiangProject"
  },
  {
    title: "文一西路西延工程(一期)",
    desc: "东起余杭数云路以西，西至狮山路，分为地下隧道+地面快速路两部分，长约1.855公里。",
    img: `/wenyixilu.webp`,
    route:"/wenyiProject"
  },
  {
    title: "阿里巴巴达摩院",
    desc: "位于余杭区南湖科学中心片区，项目用地面积22.8万平方米，总建筑面积为49万平方米。项目总投资21亿元。",
    img: `/alinanhu.webp`,
    route:"/alidamoProject"
  },
  {
    title: "余杭第一中学",
    desc: "地处余杭区良渚街道庄墩路818号，是余杭区教育局重点打造的一所高起点、高标准的现代化公办高中。占地面积168.37亩，总建筑面积约15万平方米",
    img: `/yuhangzhongxue.webp`,
    route:"/yuhangProject"
  },
]

</script>
