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
        content: 'ChatGPT AI智能助手',
      },
    ],
  },
  {
    name: 'Json',
    icon: 'Crop',
    index: 'Json',
    children: [
      {
        name: 'JsonFormatter',
        icon: 'Crop',
        index: '/JsonFormatter',
        toolName: 'JsonFormatter',
        imageName: 'json.png',
        darkImageName: 'json-dark.png',
        title: 'Json格式化',
        content: '美化Json数据',
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
      },
      {
        name: 'Json2Xml',
        icon: 'Crop',
        index: '/Json2Xml',
        toolName: 'Json2Xml',
        imageName: 'json.png',
        darkImageName: 'json-dark.png',
        title: 'Json<>Xml',
        content: 'Json和Xml相互转换.',
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
        title: 'Diff工具',
        content: '对比内容差异',
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
        content: 'MD5摘要计算工具',
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
        title: '时间戳转换',
        content: '时间戳转换工具',
      },
      {
        name: 'BinOctDecHex',
        icon: 'CirclePlus',
        index: '/BinOctDecHex',
        toolName: '进制转换',
        imageName: 'binary.png',
        darkImageName: 'binary-dark.png',
        title: '进制转换',
        content: '二进制、八进制、十进制、十六进制相互转换.',
      },
      {
        name: 'Json2Yaml',
        icon: 'CirclePlus',
        index: '/Json2Yaml',
        toolName: 'Json2Yaml',
        imageName: 'json.png',
        darkImageName: 'json-dark.png',
        title: 'Json <-> Yaml',
        content: 'Json和Yaml相互转换工具',
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
        title: 'HostSwitch',
        content: 'Host快速切换工具',
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
        content: '文本检索匹配工具, 支持正则表达式',
      },
    ],
  },
]

export default {
  sideBarMenus
}