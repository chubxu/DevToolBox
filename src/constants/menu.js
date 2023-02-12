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
        badgeName: 'dev',
        toolName: 'ChatGPT',
        imageName: 'chatgpt.png',
        darkImageName: 'chatgpt-dark.png',
        title: 'ChatGPT',
        content: 'Optimizing Language Models for Dialogue.',
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
        toolName: 'JsonFormatter',
        imageName: 'json.png',
        darkImageName: 'json-dark.png',
        title: 'JsonFormatter',
        content: 'Pretty formatter json string and copy it.',
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
        toolName: 'MD5',
        imageName: 'md5.png',
        darkImageName: 'md5-dark.png',
        title: 'MD5',
        content: 'MD5 message-digest algorithm.',
      },
    ],
  },
  {
    name: 'Convert',
    icon: 'Switch',
    index: '4',
    children: [
      {
        name: 'TimeStamp',
        icon: 'Lock',
        index: '/TimeStamp',
        toolName: 'TimeStamp',
        imageName: 'clock.png',
        darkImageName: 'clock-dark.png',
        title: 'TimeStamp',
        content: 'TimeStamp convert.',
      },
      {
        name: 'BinOctDecHex',
        icon: 'CirclePlus',
        index: '/BinOctDecHex',
        toolName: '进制转换',
        imageName: '进制转换.png',
        darkImageName: '进制转换-dark.png',
        title: '进制转换',
        content: '二进制、八进制、十进制、十六进制相互转换.',
      },
    ],
  },
]

export default {
  sideBarMenus
}