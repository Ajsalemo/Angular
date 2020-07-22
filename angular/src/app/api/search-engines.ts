export const SEARCH_ENGINES: {
  id: number;
  name: string;
  provider: string;
  icon: string;
  loadingGif: string;
}[] = [
  {
    id: 1,
    name: 'Google',
    provider: 'https://google.com/search?q=',
    icon: '../../assets/images/google.svg',
    loadingGif: '../../assets/images/searchengine-loader.gif',
  },
  {
    id: 2,
    name: 'Bing',
    provider: 'https://www.bing.com/search?q=',
    icon: '../../assets/images/bing.svg',
    loadingGif: '../../assets/images/searchengine-loader.gif',
  },
];
