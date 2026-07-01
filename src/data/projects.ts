/**
 * projects.ts
 *
 * Project data with images imported through Vite so they are fingerprinted
 * and bundled correctly in production.
 *
 * To add a project, add an import for its image (if any) and a new entry to
 * the array below. See src/types/project.ts for the full field reference.
 */

import type { Project } from '../types/project'

import takosTentacle    from '../assets/takos_tentacle.jpg'
import tumbleCad        from '../assets/tumble_cad_1.png'
import diceTower        from '../assets/dice_tower.png'
import trace            from '../assets/trace.png'
import oneOhOne         from '../assets/OneOhOne.png'
import sunlightTracker  from '../assets/sunlight_tracker.png'
import arestetrify      from '../assets/ares_tetrify.png'
import nestQuest        from '../assets/nest_quest.png'
const projects: Project[] = [
  {
    id: 'takos',
    name: 'Tactile Appendage Kinematic Octopus System (TAKOS)',
    startDate: '2026-01',
    endDate: null,
    description:
      'A robot octopus, developing in affiliation with ECLAIR Robotics as Tech Lead. Responsible for firmware and electronics development of appendage test bed.',
    tags: ['robotics', 'arduino', 'raspberry pi', 'sensors'],
    imageUrl: takosTentacle,
    link: 'https://www.notion.so/TAKOS-Tactile-Appendage-Kinematic-Octopus-System-2fcd0549950a81d0b968fcffcdbce40f',
    active: true,
    signature: true,
    awardWinning: false,
  },
  {
    id: 'tumble',
    name: 'TUMBLE',
    startDate: '2026-02',
    endDate: null,
    description:
      'A continuation of TRACE (see past projects), designing, manufacturing, and coding a robot that can navigate a ball through a maze. Essentially, a robot that can play the labyrinth game. Currently in the mechanical design and fabrication stage of the project.',
    tags: ['mechanical', 'computer vision', 'pid control'],
    imageUrl: tumbleCad,
    active: true,
    signature: false,
    awardWinning: false,
  },
  {
    id: 'dice-tower',
    name: 'Dice Tower',
    startDate: '2025-11',
    endDate: null,
    description:
      'Trained a YOLO Model to detect and classify sides of a D6 on a dice tower. Dice tower designed using Fusion360 and fabricated on an XTool P2S laser cutter.',
    tags: ['computer vision', 'yolo', 'arduino'],
    imageUrl: diceTower,
    link: 'https://www.youtube.com/watch?v=iB9HrZrPCrc&feature=youtu.be',
    active: true,
    signature: false,
    awardWinning: false,
  },
  {
    id: 'trace',
    name: 'TRACE',
    startDate: '2025-01',
    endDate: '2025-12',
    description:
      'Ping-pong ball balancing robot designed and coded from scratch. As Tech Lead, was responsible for early PID simulation work using Trick and later mechanical design for the motor and overhead camera mounts using Fusion360. Developed in affiliation with ECLAIR Robotics.',
    tags: ['mechanical', 'computer vision', 'control'],
    imageUrl: trace,
    link: 'https://eclairrobotics.web.app/projects',
    active: false,
    signature: true,
    awardWinning: false,
  },
  {
    id: 'oneohone',
    name: 'OneOhOne',
    startDate: '2025-10',
    endDate: null,
    description:
      'Developed a financial literacy app that leveraged banking data from Nessie API and responses from Gemini API to help high school consumers make informed purchasing and saving decisions. Responsible for testing and verification of purchase history analysis function.',
    tags: ['gemini api', 'javascript', 'react native'],
    imageUrl: oneOhOne,
    link: 'https://devpost.com/software/project-vader',
    active: false,
    signature: false,
    awardWinning: false,
  },
  {
    id: 'sunlight-tracker',
    name: 'Wearable Sunlight Tracker - SASE Roots 2024 Third Place',
    startDate: '2025-03',
    endDate: null,
    description:
      'Fabricated a wearable device using Arduino that tracks duration of time outside to encourage fitness and well being. Responsible for device firmware and Bluetooth Low Energy (BLE) communication between device and phone app.',
    tags: ['arduino', '3d printing', 'bluetooth low energy'],
    imageUrl: sunlightTracker,
    active: false,
    signature: false,
    awardWinning: true,
  },
  {
    id: 'tetrify',
    name: 'Tetrify (Accessible Tetris) - HackTX 2024 Winner!',
    startDate: '2024-10',
    endDate: null,
    description:
      'Made in less than 25 hours for HackTX 2024 held at the University of Texas at Austin. Colaborated with three other programmers to improve accessibility in Tetris. Used Python, Mediapipe, and OpenCV to bind large arm motions to player actions to enable those with limited finger dexterity to play Tetris. Intend to extrapolate to other games and potentially everyday use in web browsers. Won Best Novice Hack.',
    tags: ['computer vision', 'opencv', 'mediapipe'],
    imageUrl: arestetrify,
    link: 'https://devpost.com/software/ares-accessible-tetris?ref_content=my-projects-tab&ref_feature=my_projects',
    active: false,
    signature: true,
    awardWinning: true,
  },
  {
    id: 'nest-quest',
    name: 'Nest Quest - EGaDS Game Jam 2024 Winner!',
    startDate: '2024-09',
    endDate: null,
    description:
      'Made in less than 50 hours for the 2024 EGaDS Austin Texas Game Jam. Programmed a specialized 2-Dimensional physics engine using Lua and LOVE2D that handled object acceleration and collisions to create a challenging but fair movement system. Designed a progressively challenging level system involving 4 levels to challenge players of all skills levels. Won Runner Up People\'s Choice Award.',
    tags: ['game development', 'physics engine', 'love2d', 'lua'],
    imageUrl: nestQuest,
    link: 'https://itch.io/jam/texas-game-jam-2024/rate/3006722',
    active: false,
    signature: false,
    awardWinning: true,
  },
]

export default projects
