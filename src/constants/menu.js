const sideBarMenus = [
  {
    name: 'Converters',
    icon: 'Sort',
    index: '1',
    children: [
      {
        name: 'Converter1',
        icon: 'Sort',
        index: '/ConverterFirst',
      },
      {
        name: 'Converter2',
        icon: 'Sort',
        index: '/ConverterSecond',
      }
    ],
  },
  {
    name: 'Encoders / Decoders',
    icon: 'ScaleToOriginal',
    index: '2',
    children: [
      {
        name: 'Encoders',
        icon: 'ScaleToOriginal',
        index: '2-1',
      },
      {
        name: 'Decoders',
        icon: 'ScaleToOriginal',
        index: '2-2',
      }
    ],
  },
  {
    name: 'Formatter',
    icon: 'Crop',
    index: '3',
    children: [
      {
        name: 'JsonFormatter',
        icon: 'Crop',
        index: '/JsonFormatter',
      }
    ],
  }
]

export default {
  sideBarMenus
}