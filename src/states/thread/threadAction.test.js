// test scenario thread readucer
// - should dispatch action when create threads success
// - should dispatch action when create threads fail
// - should dispatch action when get all theads filter success
// - should dispatch action when get all theads filter fail
// - should dispatch action when upVote is success
// - should dispatch action when upVote is fail
// - should dispatch action when downVote is success
// - should dispatch action when downVote is fail
// - should dispatch action when NeutralizeVote is success
// - should dispatch action when NeutralizeVote is fail

import { describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';
import {
  asyncCreateThread,
  asyncDownVoteThread,
  asyncGetAllThreadWithFilter,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
  createThreadActionCreator,
  downVoteThreadActionCreator,
  getAllThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  upVoteThreadActionCreator,
} from './action';

const fakeThreadsResponse = [
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-mQhLzINW_w5TxxYf',
    totalComments: 1,
    upVotesBy: [],
    downVotesBy: ['user-1jMSiA-hLc3MUE5h'],
  },
  {
    id: 'thread-91KocEqYPRz68MhD',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
    category: 'perkenalan',
    createdAt: '2023-05-29T07:54:35.746Z',
    ownerId: 'user-aROWej8yYA1sOfHN',
    totalComments: 1,
    upVotesBy: ['user-mQhLzINW_w5TxxYf'],
    downVotesBy: [],
  },
];

const fakeThreadResponse = {
  id: 'thread-Np47p4jhUXYhrhRn',
  title: 'Bagaimana pengalamanmu belajar Redux?',
  body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
  category: 'redux',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-mQhLzINW_w5TxxYf',
  totalComments: 1,
  upVotesBy: [],
  downVotesBy: ['user-1jMSiA-hLc3MUE5h'],
};

const fakeErrorResponse = new Error('Failed');
describe('thread thunk', () => {
  it('should dispatch action when create threads success', async () => {
    vi.spyOn(api, 'createThread').mockResolvedValue(fakeThreadResponse);

    const dispatch = vi.fn();

    const payload = {
      body: 'Bagaimana pengalamanmu belajar Redux?',
      title: 'redux',
      category:
        'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    };

    await asyncCreateThread(payload)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoadingSpiner(true));
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      createThreadActionCreator(fakeThreadResponse),
    );
    expect(dispatch).toHaveBeenNthCalledWith(3, showLoadingSpiner(false));
  });

  it('should dispatch action when create threads false', async () => {
    vi.spyOn(api, 'createThread').mockRejectedValue(fakeErrorResponse);
    globalThis.alert = vi.fn(); // define dulu

    const alertMock = vi
      .spyOn(globalThis, 'alert')
      .mockImplementation(() => {});

    const dispatch = vi.fn();
    const payload = {
      title: 1,
      category: 2,
    };
    await asyncCreateThread(payload)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoadingSpiner(true));
    expect(alertMock).toHaveBeenCalledWith('Failed');
    expect(dispatch).toHaveBeenNthCalledWith(2, showLoadingSpiner(false));
  });

  it('should dispatch action when data is exist', async () => {
    vi.spyOn(api, 'getAllThread').mockResolvedValue(fakeThreadsResponse);

    const dispatch = vi.fn();

    const filter = 'redux';

    await asyncGetAllThreadWithFilter(filter)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoadingSpiner(true));
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      getAllThreadActionCreator(
        fakeThreadsResponse.filter((item) => item.category.includes(filter)),
      ),
    );
    expect(dispatch).toHaveBeenNthCalledWith(3, showLoadingSpiner(false));
  });

  it('should dispatch action when data is fail', async () => {
    vi.spyOn(api, 'getAllThread').mockRejectedValue(fakeErrorResponse);
    const alertMock = vi
      .spyOn(globalThis, 'alert')
      .mockImplementation(() => {});

    const dispatch = vi.fn();

    const filter = 'redux';

    await asyncGetAllThreadWithFilter(filter)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoadingSpiner(true));
    expect(alertMock).toHaveBeenCalledWith('Failed');
    expect(dispatch).toHaveBeenNthCalledWith(2, showLoadingSpiner(false));
  });

  it('should dispatch action when upVote is success', async () => {
    vi.spyOn(api, 'upVoteThread').mockResolvedValue(fakeThreadResponse);

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));

    await asyncUpVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn' })(
      dispatch,
      getState,
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-Np47p4jhUXYhrhRn');
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteThreadActionCreator({
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userid: 'user-1jMSiA-hLc3MUE5h',
      }),
    );
  });

  it('should dispatch action when upVote is failed', async () => {
    const alertMock = vi
      .spyOn(globalThis, 'alert')
      .mockImplementation(() => {});
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));

    await asyncUpVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn' })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteThreadActionCreator({
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userid: 'user-1jMSiA-hLc3MUE5h',
      }),
    );

    expect(alertMock).toHaveBeenCalledWith('Failed');
  });

  it('should dispatch action when downVote is success', async () => {
    vi.spyOn(api, 'downVoteThread').mockResolvedValue(fakeThreadResponse);

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));

    await asyncDownVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn' })(
      dispatch,
      getState,
    );
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-Np47p4jhUXYhrhRn');

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      downVoteThreadActionCreator({
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userid: 'user-1jMSiA-hLc3MUE5h',
      }),
    );
  });

  it('should dispatch action when downVote is failed', async () => {
    const alertMock = vi
      .spyOn(globalThis, 'alert')
      .mockImplementation(() => {});
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));

    await asyncDownVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn' })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      downVoteThreadActionCreator({
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userid: 'user-1jMSiA-hLc3MUE5h',
      }),
    );

    expect(alertMock).toHaveBeenCalledWith('Failed');
  });

  it('should dispatch action when neutralizeVote is success', async () => {
    vi.spyOn(api, 'neutralizeThreadVote').mockResolvedValue(fakeThreadResponse);
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));

    await asyncNeutralizeVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn', statusVoteLast: 'downVote' })(dispatch, getState);
    expect(dispatch).toHaveBeenNthCalledWith(1, neutralizeVoteThreadActionCreator({
      threadId: 'thread-Np47p4jhUXYhrhRn',
      userid: 'user-1jMSiA-hLc3MUE5h',
      statusVoteLast: 'downVote'
    }));
    expect(api.neutralizeThreadVote).toHaveBeenNthCalledWith(1, 'thread-Np47p4jhUXYhrhRn');
  });

  it('should dispatch action when neutralizeVote is failed', async () => {
    const alertMock = vi.spyOn(globalThis, 'alert').mockImplementation();
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({
      authUser: {
        id: 'user-1jMSiA-hLc3MUE5h',
      },
    }));
    await asyncNeutralizeVoteThread({ threadId: 'thread-Np47p4jhUXYhrhRn', statusVoteLast: 'downVote' })(dispatch, getState);
    expect(api.neutralizeThreadVote).toHaveBeenNthCalledWith(2, 'thread-Np47p4jhUXYhrhRn');
    expect(alertMock).toHaveBeenCalledWith('Failed');
  });
});
