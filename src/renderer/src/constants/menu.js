const sideBarMenus = [
  {
    name: 'AIGC',
    icon: 'Cpu',
    index: 'AIGC',
    children: [
      {
        name: 'ChatGPT',
        icon: 'Memo',
        index: '/ChatGPT',
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
    index: 'Formatter',
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
      },
      {
        name: 'JsonCompression',
        icon: 'Crop',
        index: '/JsonCompression',
        toolName: 'Json压缩',
        imageName: 'json.png',
        darkImageName: 'json-dark.png',
        title: 'Json压缩',
        content: '将格式化json数据压缩成一行.',
      }
    ],
  },
  {
    name: 'Diff',
    icon: 'Connection',
    index: 'Diff',
    children: [
      {
        name: 'FileDiff',
        icon: 'Document',
        index: '/FileDiff',
        toolName: 'FileDiff',
        imageName: 'diff.png',
        darkImageName: 'diff-dark.png',
        title: 'FileDiff',
        content: 'File comparison tool.',
      }
    ]
  },
  {
    name: 'Encrypt & Decrypt',
    icon: 'Grid',
    index: 'Encrypt & Decrypt',
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
    index: 'Convert',
    children: [
      {
        name: 'TimeStamp',
        icon: 'Clock',
        index: '/TimeStamp',
        toolName: 'TimeStamp',
        imageName: 'timestamp.png',
        darkImageName: 'timestamp-dark.png',
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
      {
        name: 'Json2Yaml',
        icon: 'CirclePlus',
        index: '/Json2Yaml',
        toolName: 'Json2Yaml',
        imageName: 'Json2Yaml.png',
        darkImageName: 'Json2Yaml-dark.png',
        title: 'Json2Yaml',
        content: 'Json -> YAML; YAML -> Json.',
      },
    ],
  },
  {
    name: 'Host',
    icon: 'House',
    index: 'Host',
    children: [
      {
        name: 'Host',
        icon: 'House',
        index: '/Host',
        toolName: 'Host',
        imageName: 'host.png',
        darkImageName: 'host-dark.png',
        title: 'Host',
        content: 'Host Switch.',
      },
    ],
  },
  {
    name: 'RegMatch',
    icon: 'House',
    index: 'RegMatch',
    children: [
      {
        name: 'RegMatch',
        icon: 'House',
        index: '/RegMatch',
        toolName: 'RegMatch',
        imageName: 'reg-match.png',
        darkImageName: 'reg-match-dark.png',
        title: 'RegMatch',
        content: 'Regular match word.',
        badgeName: 'dev',
      },
    ],
  },
]

export default {
  sideBarMenus
}