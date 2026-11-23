import type { Comment } from '@/types'

export const comments: Comment[] = [
  // p1 (3)
  {
    id: 'c1',
    postId: 'p1',
    authorId: 'u2',
    text: 'Strict mode is painful for a week and then you never want to go back.',
    createdAt: '2026-11-22T08:40:00.000Z',
  },
  {
    id: 'c2',
    postId: 'p1',
    authorId: 'u3',
    text: '400 errors is honestly a good number. We had over 1,200.',
    createdAt: '2026-11-22T09:05:00.000Z',
  },
  {
    id: 'c3',
    postId: 'p1',
    authorId: 'u1',
    text: '@priya_codes 1,200?! I salute you. 🫡',
    createdAt: '2026-11-22T09:30:00.000Z',
  },

  // p2 (5)
  {
    id: 'c4',
    postId: 'p2',
    authorId: 'u1',
    text: 'Saying no is the hardest design skill to teach.',
    createdAt: '2026-11-22T11:10:00.000Z',
  },
  {
    id: 'c5',
    postId: 'p2',
    authorId: 'u4',
    text: 'Applies to writing too. Cut half and it gets better.',
    createdAt: '2026-11-22T11:45:00.000Z',
  },
  {
    id: 'c6',
    postId: 'p2',
    authorId: 'u6',
    text: 'Same with dashboards. Every extra chart is a tax on attention.',
    createdAt: '2026-11-22T12:20:00.000Z',
  },
  {
    id: 'c7',
    postId: 'p2',
    authorId: 'u7',
    text: 'And recipes! Fewer ingredients, better dish.',
    createdAt: '2026-11-22T13:02:00.000Z',
  },
  {
    id: 'c8',
    postId: 'p2',
    authorId: 'u2',
    text: '@elenarossi ha, perfect example.',
    createdAt: '2026-11-22T13:30:00.000Z',
  },

  // p3 (4)
  {
    id: 'c9',
    postId: 'p3',
    authorId: 'u1',
    text: 'Congrats Priya! Adding it to my side project tonight.',
    createdAt: '2026-11-21T19:55:00.000Z',
  },
  {
    id: 'c10',
    postId: 'p3',
    authorId: 'u2',
    text: 'Rust folks always ship the fast stuff. Nice work!',
    createdAt: '2026-11-21T20:30:00.000Z',
  },
  {
    id: 'c11',
    postId: 'p3',
    authorId: 'u8',
    text: "Do you have benchmarks published? I'd love to see them.",
    createdAt: '2026-11-21T21:10:00.000Z',
  },
  {
    id: 'c12',
    postId: 'p3',
    authorId: 'u3',
    text: "@dkim yes, they're in the README. Happy to take PRs too!",
    createdAt: '2026-11-21T22:00:00.000Z',
  },

  // p4 (2)
  {
    id: 'c13',
    postId: 'p4',
    authorId: 'u2',
    text: 'Get a daylight lamp. Changed my life in Brooklyn winters.',
    createdAt: '2026-11-21T12:30:00.000Z',
  },
  {
    id: 'c14',
    postId: 'p4',
    authorId: 'u3',
    text: 'Texas is sending sunshine your way. Sadly only in spirit.',
    createdAt: '2026-11-21T14:15:00.000Z',
  },

  // p5 (6)
  {
    id: 'c15',
    postId: 'p5',
    authorId: 'u1',
    text: 'Abstract cat is the best cat.',
    createdAt: '2026-11-20T05:20:00.000Z',
  },
  {
    id: 'c16',
    postId: 'p5',
    authorId: 'u6',
    text: 'I would hang this on my wall.',
    createdAt: '2026-11-20T06:00:00.000Z',
  },
  {
    id: 'c17',
    postId: 'p5',
    authorId: 'u8',
    text: 'The motion on the tail is so smooth. How long did it take?',
    createdAt: '2026-11-20T07:45:00.000Z',
  },
  {
    id: 'c18',
    postId: 'p5',
    authorId: 'u5',
    text: '@dkim about two days for ten seconds. Animation is humbling.',
    createdAt: '2026-11-20T08:30:00.000Z',
  },
  {
    id: 'c19',
    postId: 'p5',
    authorId: 'u7',
    text: 'Doughlores approves of this cat. 🍞🐱',
    createdAt: '2026-11-20T09:10:00.000Z',
  },
  {
    id: 'c20',
    postId: 'p5',
    authorId: 'u2',
    text: 'More of this please!',
    createdAt: '2026-11-20T10:00:00.000Z',
  },

  // p6 (7)
  {
    id: 'c21',
    postId: 'p6',
    authorId: 'u3',
    text: 'The pie chart with 14 slices is a cry for help.',
    createdAt: '2026-11-20T14:50:00.000Z',
  },
  {
    id: 'c22',
    postId: 'p6',
    authorId: 'u7',
    text: 'I make pies, not pie charts. Both should be simple.',
    createdAt: '2026-11-20T15:20:00.000Z',
  },
  {
    id: 'c23',
    postId: 'p6',
    authorId: 'u9',
    text: 'Please tell this to every report I review.',
    createdAt: '2026-11-20T16:05:00.000Z',
  },
  {
    id: 'c24',
    postId: 'p6',
    authorId: 'u1',
    text: 'Bar charts forever.',
    createdAt: '2026-11-20T16:40:00.000Z',
  },
  {
    id: 'c25',
    postId: 'p6',
    authorId: 'u6',
    text: '@sarahchen the only chart type I trust.',
    createdAt: '2026-11-20T17:15:00.000Z',
  },
  {
    id: 'c26',
    postId: 'p6',
    authorId: 'u4',
    text: "Meanwhile the 3D pie chart in my last job's slides...",
    createdAt: '2026-11-20T18:30:00.000Z',
  },
  {
    id: 'c27',
    postId: 'p6',
    authorId: 'u8',
    text: 'Correlation also does not imply the chart is any good.',
    createdAt: '2026-11-20T19:45:00.000Z',
  },

  // p7 (8)
  {
    id: 'c28',
    postId: 'p7',
    authorId: 'u2',
    text: 'Doughlores is a great name.',
    createdAt: '2026-11-19T07:45:00.000Z',
  },
  {
    id: 'c29',
    postId: 'p7',
    authorId: 'u5',
    text: 'I need a photo of her immediately.',
    createdAt: '2026-11-19T08:20:00.000Z',
  },
  {
    id: 'c30',
    postId: 'p7',
    authorId: 'u10',
    text: 'what is a starter',
    createdAt: '2026-11-19T09:00:00.000Z',
  },
  {
    id: 'c31',
    postId: 'p7',
    authorId: 'u9',
    text: "@tombecker it's a live culture of flour and water used to make bread rise.",
    createdAt: '2026-11-19T09:40:00.000Z',
  },
  {
    id: 'c32',
    postId: 'p7',
    authorId: 'u7',
    text: '@tombecker exactly! Come bake with us.',
    createdAt: '2026-11-19T10:15:00.000Z',
  },
  {
    id: 'c33',
    postId: 'p7',
    authorId: 'u4',
    text: 'Mine died after week two. Respect.',
    createdAt: '2026-11-19T11:30:00.000Z',
  },
  {
    id: 'c34',
    postId: 'p7',
    authorId: 'u1',
    text: 'Keep us posted on the first loaf!',
    createdAt: '2026-11-19T12:10:00.000Z',
  },
  {
    id: 'c35',
    postId: 'p7',
    authorId: 'u3',
    text: 'Feed her well. 🙏',
    createdAt: '2026-11-19T13:00:00.000Z',
  },

  // p8 (9)
  {
    id: 'c36',
    postId: 'p8',
    authorId: 'u1',
    text: 'Anxious potato is a mood. Playing now!',
    createdAt: '2026-11-19T17:10:00.000Z',
  },
  {
    id: 'c37',
    postId: 'p8',
    authorId: 'u3',
    text: 'Just beat level 3. The jump physics feel great.',
    createdAt: '2026-11-19T17:50:00.000Z',
  },
  {
    id: 'c38',
    postId: 'p8',
    authorId: 'u5',
    text: 'The potato sprite is adorable.',
    createdAt: '2026-11-19T18:30:00.000Z',
  },
  {
    id: 'c39',
    postId: 'p8',
    authorId: 'u9',
    text: 'Finished it in one sitting. Relatable protagonist.',
    createdAt: '2026-11-19T19:15:00.000Z',
  },
  {
    id: 'c40',
    postId: 'p8',
    authorId: 'u4',
    text: 'Is there a sequel with a nervous carrot?',
    createdAt: '2026-11-19T20:00:00.000Z',
  },
  {
    id: 'c41',
    postId: 'p8',
    authorId: 'u8',
    text: '@liamoc you read my mind. Planning one for next month!',
    createdAt: '2026-11-19T20:30:00.000Z',
  },
  {
    id: 'c42',
    postId: 'p8',
    authorId: 'u2',
    text: 'Love the menu design. Clean.',
    createdAt: '2026-11-19T21:20:00.000Z',
  },
  {
    id: 'c43',
    postId: 'p8',
    authorId: 'u6',
    text: 'Got stuck on level 5 for an hour. Worth it.',
    createdAt: '2026-11-19T22:05:00.000Z',
  },
  {
    id: 'c44',
    postId: 'p8',
    authorId: 'u7',
    text: "My nephew now won't stop playing it.",
    createdAt: '2026-11-19T23:30:00.000Z',
  },

  // p9 (1)
  {
    id: 'c45',
    postId: 'p9',
    authorId: 'u6',
    text: 'Good to see actual numbers. Do you have the source?',
    createdAt: '2026-11-18T12:00:00.000Z',
  },

  // p10 (0) - no comments

  // p11 (4)
  {
    id: 'c46',
    postId: 'p11',
    authorId: 'u3',
    text: '"Eventually" is doing a lot of heavy lifting, but I agree.',
    createdAt: '2026-11-17T10:05:00.000Z',
  },
  {
    id: 'c47',
    postId: 'p11',
    authorId: 'u6',
    text: 'In data work, tests written after a bug are the best ones.',
    createdAt: '2026-11-17T11:20:00.000Z',
  },
  {
    id: 'c48',
    postId: 'p11',
    authorId: 'u8',
    text: 'Games are hard to test, but I try for the logic parts.',
    createdAt: '2026-11-17T13:40:00.000Z',
  },
  {
    id: 'c49',
    postId: 'p11',
    authorId: 'u1',
    text: '@priya_codes @dkim fair points all around.',
    createdAt: '2026-11-17T15:00:00.000Z',
  },

  // p12 (2)
  {
    id: 'c50',
    postId: 'p12',
    authorId: 'u1',
    text: 'Compiler as strict teacher. Respect.',
    createdAt: '2026-11-16T18:45:00.000Z',
  },
  {
    id: 'c51',
    postId: 'p12',
    authorId: 'u8',
    text: 'The yelling gets easier to understand over time.',
    createdAt: '2026-11-16T20:10:00.000Z',
  },
]
