import { configureStore } from "@reduxjs/toolkit";
import {jest} from '@jest/globals';
import {
  setUser,
  setFollowedEmployees,
  setSearchResults,
  setIsFollowing,
  resetStatus,
  fetchUserById,
  fetchFollowedEmployees,
  searchUsers,
  followEmployee,
  unfollowEmployee,
  checkIsFollowing
} from "./usersSlice.js";

describe("users slice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: () => ({ user: {}, followedEmployees: [], searchResults: [], isFollowing: false, status: "idle", error: null })
      }
    });
  });

  describe("reducers", () => {
    it("should set the user in the state", () => {
      const user = { id: 1, email: "test@test.com", firstName: "Test", lastName: "User" };
      store.dispatch(setUser(user));
      const actual = store.getState().users.user;
      const expected = user;
      expect(actual).toEqual(expected);
    });

    it("should set the followed employees in the state", () => {
      const employees = [{ id: 1, firstName: "Test", lastName: "Employee" }, { id: 2, firstName: "Test2", lastName: "Employee2" }];
      store.dispatch(setFollowedEmployees(employees));
      const actual = store.getState().users.followedEmployees;
      const expected = employees;
      expect(actual).toEqual(expected);
    });

    it("should set the search results in the state", () => {
      const searchResults = [{ id: 1, email: "test@test.com", firstName: "Test", lastName: "User" }];
      store.dispatch(setSearchResults(searchResults));
      const actual = store.getState().users.searchResults;
      const expected = searchResults;
      expect(actual).toEqual(expected);
    });

    it("should set the isFollowing value in the state", () => {
      store.dispatch(setIsFollowing(true));
      const actual = store.getState().users.isFollowing;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it("should reset the status and error values in the state", () => {
      store.dispatch(setUser({}));
      store.dispatch(resetStatus());
      const actual = store.getState().users;
      const expected = { user: {}, followedEmployees: [], searchResults: [], isFollowing: false, status: "idle", error: null };
      expect(actual).toEqual(expected);
    });
  });

  describe("async thunks", () => {
    const mockUser = { id: 1, email: "test@test.com", firstName: "Test", lastName: "User" };
    const mockEmployees = [{ id: 1, firstName: "Test", lastName: "Employee" }, { id: 2, firstName: "Test2", lastName: "Employee2" }];
    const mockSearchResults = [{ id: 1, email: "test@test.com", firstName: "Test", lastName: "User" }];
    const mockFollowRequest = { userId: 1, employeeId: 2 };

    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => mockUser });
    });

    afterEach(() => {
      global.fetch.mockRestore();
    });

    it("should fetch a user by ID and set it in the state", async () => {
      await store.dispatch(fetchUserById(1));
      const actual = store.getState().users.user;
      const expected = mockUser;
      expect(actual).toEqual(expected);
    });

        it("should fetch followed employees and set them in the state", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => mockEmployees });
      await store.dispatch(fetchFollowedEmployees(1));
      const actual = store.getState().users.followedEmployees;
      const expected = mockEmployees;
      expect(actual).toEqual(expected);
    });

    it("should search for users and set the results in the state", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => mockSearchResults });
      await store.dispatch(searchUsers("test"));
      const actual = store.getState().users.searchResults;
      const expected = mockSearchResults;
      expect(actual).toEqual(expected);
    });

    it("should follow an employee and set the isFollowing value in the state", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => "success" });
      await store.dispatch(followEmployee(mockFollowRequest));
      const actual = store.getState().users.isFollowing;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it("should unfollow an employee and set the isFollowing value in the state", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => "success" });
      await store.dispatch(unfollowEmployee(mockFollowRequest));
      const actual = store.getState().users.isFollowing;
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it("should check if the user is following an employee and set the isFollowing value in the state", async () => {
      jest.spyOn(global, "fetch").mockResolvedValue({ json: () => true });
      await store.dispatch(checkIsFollowing(mockFollowRequest));
      const actual = store.getState().users.isFollowing;
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });
});