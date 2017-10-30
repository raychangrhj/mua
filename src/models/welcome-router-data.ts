export interface WelcomeRouterData {
  description: string;
  gettingStartedLink: any[] | string;
  continueLink: any[] | string;
  requirements: Requirement[]
}

interface Requirement {
  imgSrc: string;
  title: string;
  altText: string;
}
