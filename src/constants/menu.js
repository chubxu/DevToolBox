const sideBarMenus = [
  {
    name: 'AIGC',
    icon: 'Cpu',
    index: '1',
    children: [
      {
        name: 'ChatGPT',
        icon: 'Memo',
        index: '/ChatGPT',
      },
    ],
  },
  {
    name: 'Formatter',
    icon: 'Crop',
    index: '2',
    children: [
      {
        name: 'JsonFormatter',
        icon: 'Crop',
        index: '/JsonFormatter',
      }
    ],
  },
  {
    name: 'Encrypt & Decrypt',
    icon: 'Grid',
    index: '3',
    children: [
      {
        name: 'MD5',
        icon: 'Lock',
        index: '/MD5',
      },
    ],
  },
  {
    name: 'Convert',
    icon: 'Grid',
    index: '4',
    children: [
      {
        name: 'TimeStamp',
        icon: 'Lock',
        index: '/TimeStamp',
      },
    ],
  },
]

export default {
  sideBarMenus
}