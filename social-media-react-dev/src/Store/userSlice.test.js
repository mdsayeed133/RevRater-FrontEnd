import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchUserById, 
  fetchFollowedEmployees,
  searchUsers} from './userSlice';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchUserById', () => {
  it('should fetch a user by ID and set the correct values', async () => {
    const user = {
      id: 201,
      email: 'test',
      password: 'notTest',
      firstName: 'test',
      lastName: 'test',
      date: '2023-02-25T23:56:11.585391Z',
    };

    axios.get.mockResolvedValue({ data: user });

    const expectedActions = [
      {
        type: fetchUserById.pending.type,
        meta: {
          arg: 201,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      },
      {
        type: fetchUserById.fulfilled.type,
        payload: user,
        meta: {
          arg: 201,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      },
    ];

    const store = mockStore({
      user: {},
      followedEmployees: [],
      searchResults: [],
      followMessage: "",
      resetMessage:"",
      isFollowing: false,
      status: "idle",
      error: null
    });

    await store.dispatch(fetchUserById(201)).unwrap();

    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()[1].payload).toEqual(user);

  });
});

describe('fetchFollowedEmployees', () => {
    it('should fetch followed employees by user ID and set the correct values', async () => {
      const userId = 201;
      const followedEmployees = [
        {
          id: 21,
          firstName: 'Alfred',
          lastName: 'Mcguire',
          author: {
            id: 150,
            email: 'Wallin6087@protonmail.com',
            password: '@12o*',
            firstName: 'Zona',
            lastName: 'Wallin',
            date: '2023-02-23T04:28:06.500386Z',
          },
          department: {
            id: 6,
            title: 'Management',
          },
          createdDate: '2023-02-23T04:28:09.465528Z',
        },
      ];

      axios.get.mockResolvedValue({
        data: followedEmployees,
      });

      const expectedActions = [
        {
          type: fetchFollowedEmployees.pending.type,
          meta: {
            arg: userId,
            requestId: expect.any(String),
            requestStatus: 'pending',
          },
        },
        {
          type: fetchFollowedEmployees.fulfilled.type,
          payload: followedEmployees,
          meta: {
            arg: userId,
            requestId: expect.any(String),
            requestStatus: 'fulfilled',
          },
        },
      ];

      const store = mockStore({
        user: {},
        followedEmployees: [],
        searchResults: [],
        followMessage: "",
        resetMessage:"",
        isFollowing: false,
        status: "idle",
        error: null
      });

      await store.dispatch(fetchFollowedEmployees(userId));


      expect(store.getActions()).toEqual(expectedActions);
      expect(store.getActions()[1].payload).toEqual(followedEmployees);

    });
  });
describe('searchUsers', () => {
  it("should fetch search results and set the correct values", async () => {
    const search = "tha";
    const searchResults = [
      {
        id: 66,
        email: "Bertha3487@yahoo.com",
        password: "a22m(",
        firstName: "Bertha",
        lastName: "Fassett",
        date: "2023-02-23T04:28:06.500386Z",
      },
      {
        id: 137,
        email: "Bethany6638@gmail.com",
        password: "o77.#",
        firstName: "Bethany",
        lastName: "Manning",
        date: "2023-02-23T04:28:06.500386Z",
      },
      {
        id: 163,
        email: "Triffo4476@protonmail.com",
        password: "m15@^",
        firstName: "Martha",
        lastName: "Triffo",
        date: "2023-02-23T04:28:06.500386Z",
      },
    ];
    const expectedActions = [
          {
            type: searchUsers.pending.type,
            meta: {
              arg: search,
              requestId: expect.any(String),
              requestStatus: 'pending',
            },
          },
          {
            type: searchUsers.fulfilled.type,
            payload: searchResults,
            meta: {
              arg: search,
              requestId: expect.any(String),
              requestStatus: 'fulfilled',
            },
          },
        ];

    const store = mockStore({
          user: {},
          followedEmployees: [],
          searchResults: [],
          followMessage: "",
          resetMessage:"",
          isFollowing: false,
          status: "idle",
          error: null
        });

    await store.dispatch(searchUsers(search)).unwrap();

    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()[1].payload).toEqual(searchResults);
  });
});
