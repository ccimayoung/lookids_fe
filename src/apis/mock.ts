import mSleep from '../utils/mSleep';

export const mockDailylookList = async () => {
  await mSleep(500);
  return {
    data: [
      {
        hashTag: '#강쥐 #댕댕이 #귀엽다',
        imageUrls: ['http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'],
        user: {
          name: 'F2B2',
          userId: 'F2B2',
        },
      },
      {
        hashTag: '#강쥐 #댕댕이 #귀엽다',
        imageUrls: ['http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'],
        user: {
          name: 'F2B2',
          userId: 'F2B2',
        },
      },
      {
        hashTag: '#강쥐 #댕댕이 #귀엽다',
        imageUrls: ['http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'],
        user: {
          name: 'F2B2',
          userId: 'F2B2',
        },
      },
    ],
  };
};
