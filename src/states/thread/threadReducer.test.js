// test scenario thread readucer
// 1. should return the initial state when given by unknown action.
// 2. should return  new thread from create thread when given by CREATE_THREAD
// 3. should return the all threads when given by GET_ALL_THRREAD
// 4. should return the detail threads when given by GET_DETAIL_THREAD
// 5. should return the thread with user toggled up vote  when given by UP_VOTE_THREAD
// 6. should return the thread with user toggled down vote  when given by DOWN_VOTE_THREAD
// 7. should return the thread with user toggled twices down vote or up vote when given by NEUTRALIZE_VOTE_THREAD and StatusVoteLast is upvote

import { describe, expect, it } from 'vitest';
import threadReducer from './reducer';

function checkingVote(thread, action){
  let defaulValue = false;
  thread.map((threadItem) => {
    if (threadItem.id == action.payload.threadId) {
      if (action.type == 'UP_VOTE_THREAD') {
        const resultValidationUpVoteIsValid = threadItem.upVotesBy.some((x) => x.includes(action.payload.userid)) && !threadItem.downVotesBy.some((x) => x.includes(action.payload.userid));
        if (resultValidationUpVoteIsValid) {
          defaulValue = true;
        }
      } else if (action.type == 'DOWN_VOTE_THREAD') {
        const resultValidationDownVoteIsValid = threadItem.downVotesBy.some((x) => x.includes(action.payload.userid)) && !threadItem.upVotesBy.some((x) => x.includes(action.payload.userid));
        if (resultValidationDownVoteIsValid) {
          defaulValue = true;
        }
      } else if (action.type == 'NEUTRALIZE_VOTE_THREAD'){
        const resultValidationNeutralizeDownVoteIsValid =  !threadItem.downVotesBy.some((x) => x.includes(action.payload.userid));
        const resultValidationNeutralizeUpVoteIsValid =  !threadItem.upVotesBy.some((x) => x.includes(action.payload.userid));
        if (resultValidationNeutralizeDownVoteIsValid && resultValidationNeutralizeUpVoteIsValid) {
          defaulValue = true;
        }
      }
    }
  });

  return defaulValue;
};

describe('threadresducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return  new thread from create thread when given by CREATE_THREAD', () =>{
    const initialState = [
      {
        'id': 'thread-1',
        'title': 'Thread Pertama',
        'body': 'Ini adalah thread pertama',
        'category': 'General',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': [],
        'downVotesBy': [],
        'totalComments': 0
      }
    ];
    const action = {
      type  : 'CREATE_THREAD',
      payload: {
        'id': 'thread-1',
        'title': 'Thread Pertama',
        'body': 'Ini adalah thread pertama',
        'category': 'General',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': [],
        'downVotesBy': [],
        'totalComments': 0
      }
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the all threads when given by GET_ALL_THRREAD', () => {
    const initialState =[{
      'id': 'thread-1',
      'title': 'Thread Pertama',
      'body': 'Ini adalah thread pertama',
      'category': 'General',
      'createdAt': '2021-06-21T07:00:00.000Z',
      'ownerId': 'users-1',
      'upVotesBy': [],
      'downVotesBy': [],
      'totalComments': 0
    },
    {
      'id': 'thread-2',
      'title': 'Thread Kedua',
      'body': 'Ini adalah thread kedua',
      'category': 'General',
      'createdAt': '2021-06-21T07:00:00.000Z',
      'ownerId': 'users-2',
      'upVotesBy': [],
      'downVotesBy': [],
      'totalComments': 0
    }];

    const action = {
      type : 'GET_ALL_THRREAD',
      payload: {
        threads: [{
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0
        },
        {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread kedua',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-2',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0
        }]
      }
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the thread with user toggled up vote when given by UP_VOTE_THREAD', () => {
    const initalState = [
      {
        'id': 'thread-Np47p4jhUXYhrhRn',
        'title': 'Bagaimana pengalamanmu belajar Redux?',
        'body': 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        'category': 'redux',
        'createdAt': '2023-05-29T07:55:52.266Z',
        'ownerId': 'user-mQhLzINW_w5TxxYf',
        'totalComments': 1,
        'upVotesBy': [
          'user-mQhLzINW_w5TxxYf'
        ],
        'downVotesBy': []
      },
      {
        'id': 'thread-91KocEqYPRz68MhD',
        'title': 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        'body': '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        'category': 'perkenalan',
        'createdAt': '2023-05-29T07:54:35.746Z',
        'ownerId': 'user-aROWej8yYA1sOfHN',
        'totalComments': 1,
        'upVotesBy': [
          'user-mQhLzINW_w5TxxYf'
        ],
        'downVotesBy': []
      }
    ];

    const action = {
      type : 'UP_VOTE_THREAD',
      payload: {
        'userid': 'user-1jMSiA-hLc3MUE5h',
        'threadId': 'thread-Np47p4jhUXYhrhRn'
      }
    };

    const nextState = threadReducer(initalState, action);
    expect(checkingVote(nextState, action)).toEqual(true);
  });

  it('should return the thread with user toggled up vote when given by DOWN_VOTE_THREAD', () => {
    const initalState = [
      {
        'id': 'thread-Np47p4jhUXYhrhRn',
        'title': 'Bagaimana pengalamanmu belajar Redux?',
        'body': 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        'category': 'redux',
        'createdAt': '2023-05-29T07:55:52.266Z',
        'ownerId': 'user-mQhLzINW_w5TxxYf',
        'totalComments': 1,
        'upVotesBy': [
          'user-1jMSiA-hLc3MUE5h'
        ],
        'downVotesBy': []
      },
      {
        'id': 'thread-91KocEqYPRz68MhD',
        'title': 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        'body': '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        'category': 'perkenalan',
        'createdAt': '2023-05-29T07:54:35.746Z',
        'ownerId': 'user-aROWej8yYA1sOfHN',
        'totalComments': 1,
        'upVotesBy': [
          'user-mQhLzINW_w5TxxYf'
        ],
        'downVotesBy': []
      }
    ];

    const action = {
      type : 'DOWN_VOTE_THREAD',
      payload: {
        'userid': 'user-1jMSiA-hLc3MUE5h',
        'threadId': 'thread-Np47p4jhUXYhrhRn'
      }
    };

    const nextState = threadReducer(initalState, action);
    expect(checkingVote(nextState, action)).toEqual(true);
  });

  it('should return the thread with user toggled twices down vote or up vote when given by NEUTRALIZE_VOTE_THREAD and StatusVoteLast is upvote', () => {
    const initalState = [
      {
        'id': 'thread-Np47p4jhUXYhrhRn',
        'title': 'Bagaimana pengalamanmu belajar Redux?',
        'body': 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        'category': 'redux',
        'createdAt': '2023-05-29T07:55:52.266Z',
        'ownerId': 'user-mQhLzINW_w5TxxYf',
        'totalComments': 1,
        'upVotesBy': [
          'user-1jMSiA-hLc3MUE5h'
        ],
        'downVotesBy': []
      },
      {
        'id': 'thread-91KocEqYPRz68MhD',
        'title': 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        'body': '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        'category': 'perkenalan',
        'createdAt': '2023-05-29T07:54:35.746Z',
        'ownerId': 'user-aROWej8yYA1sOfHN',
        'totalComments': 1,
        'upVotesBy': [
          'user-mQhLzINW_w5TxxYf'
        ],
        'downVotesBy': []
      }
    ];

    const action = {
      type : 'NEUTRALIZE_VOTE_THREAD',
      payload: {
        'userid': 'user-1jMSiA-hLc3MUE5h',
        'threadId': 'thread-Np47p4jhUXYhrhRn',
        'statusVoteLast': 'upvote'
      }
    };

    const nextState = threadReducer(initalState, action);
    expect(checkingVote(nextState, action)).toEqual(true);
  });

  it('should return the thread with user toggled twices down vote or up vote when given by NEUTRALIZE_VOTE_THREAD and StatusVoteLast is downvote', () => {
    const initalState = [
      {
        'id': 'thread-Np47p4jhUXYhrhRn',
        'title': 'Bagaimana pengalamanmu belajar Redux?',
        'body': 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        'category': 'redux',
        'createdAt': '2023-05-29T07:55:52.266Z',
        'ownerId': 'user-mQhLzINW_w5TxxYf',
        'totalComments': 1,
        'upVotesBy': [],
        'downVotesBy': ['user-1jMSiA-hLc3MUE5h']
      },
      {
        'id': 'thread-91KocEqYPRz68MhD',
        'title': 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        'body': '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        'category': 'perkenalan',
        'createdAt': '2023-05-29T07:54:35.746Z',
        'ownerId': 'user-aROWej8yYA1sOfHN',
        'totalComments': 1,
        'upVotesBy': [
          'user-mQhLzINW_w5TxxYf'
        ],
        'downVotesBy': []
      }
    ];

    const action = {
      type : 'NEUTRALIZE_VOTE_THREAD',
      payload: {
        'userid': 'user-1jMSiA-hLc3MUE5h',
        'threadId': 'thread-Np47p4jhUXYhrhRn',
        'statusVoteLast': 'downvote'
      }
    };

    const nextState = threadReducer(initalState, action);
    expect(checkingVote(nextState, action)).toEqual(true);
  });
});