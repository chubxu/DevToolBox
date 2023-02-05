const sideBarMenus = [
  {
    name: 'Formatter',
    icon: 'Crop',
    index: '1',
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
    index: '2',
    children: [
      {
        name: 'MD5',
        icon: 'Lock',
        index: '/MD5',
      },
    ],
  },
  {
    name: 'Converters',
    icon: 'Sort',
    index: '3',
    children: [],
  },
  {
    name: 'Encoders / Decoders',
    icon: 'ScaleToOriginal',
    index: '4',
    children: [],
  },
  
]

export default {
  sideBarMenus
}