import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getDoc, doc, collection, getDocs, query, addDoc, setDoc} from "firebase/firestore";
import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {firestore} from "../../firebase/index.js";
import toast from "react-hot-toast";

const initialState = {
  complaints: [],
  prompts: [],
  currentPosition: null,
  loading: false,
  user: null,
  errorMsg: ''
}

export const getUserProfile = createAsyncThunk(
  'mainSlice/getUserProfile',
  async (id) => {
    const docRef = doc(firestore, 'users', id);
    try {
      const response = await getDoc(docRef)
      return { id: response.id, ...response.data() }
    } catch (e) {
      console.log(e)
    }
  }
)

export const signIn = createAsyncThunk(
  'mainSlice/signIn',
  async ({email, password}, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(getAuth(), email, password);
      const user = await getDoc(doc(firestore, 'users', response.user.uid))
      return {id: user.id, ...user.data()}
    } catch (e) {
      console.log(e.code)
      return rejectWithValue(e.code)
    }
  }
)

export const signUp = createAsyncThunk(
  'mainSlice/signUp',
  async ({email, password, firstName, lastName}, { rejectWithValue  }) => {
    try {
      const response = await createUserWithEmailAndPassword(getAuth(), email, password)
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: response.user.email,
        role: 'admin',
        id: response.user.uid,
        created: response.user.metadata.creationTime,
        updated: response.user.metadata.creationTime
      }
      await setDoc(doc(firestore, 'users', response.user.uid), userData);
      return userData;
    } catch (e) {
      console.log(e.code)
      return rejectWithValue(e.code)
    }
  }
)

export const logOut = createAsyncThunk(
  'mainSlice/signOut',
  async () => {
    await signOut(getAuth());
  }
)

export const fetchComplaints = createAsyncThunk(
  'mainSlice/fetchComplaints',
  async () => {
    const data = [];
    const ref = query(collection(firestore, 'complaints'));
    const querySnapshot = await getDocs(ref);

    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });

    return data;
  }
)

export const fetchPrompts = createAsyncThunk(
  'mainSlice/fetchPrompts',
  async () => {
    const data = [];
    const ref = query(collection(firestore, 'prompts'));
    const querySnapshot = await getDocs(ref);

    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });

    return data;
  }
)

export const createComplaint = createAsyncThunk(
  'mainSlice/fetchComplaints',
  async (complaint) => {
    try {
      console.log(complaint)
      await addDoc(collection(firestore, 'complaints'), complaint);
      toast.success('Жалоба создана!!')
    } catch (e) {
      console.log(e)
    }
  }
)

export const createPrompt = createAsyncThunk(
  'mainSlice/createPrompt',
  async (prompt) => {
    try {
      await addDoc(collection(firestore, 'prompts'), prompt);
      toast.success('Напоминание создана!!')
    } catch (e) {
      console.log(e)
    }
  }
)

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addComplaint: (state, action) => {
      state.complaints = [...state.complaints, {...action.payload, position: state.currentPosition}]
    },
    addCurrentPosition: (state, action) => {
      state.currentPosition = action.payload;
    },
    removeCurrentPosition: (state) => {
      state.currentPosition = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.errorMsg = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      })
  }
})

export const {addComplaint, addCurrentPosition, removeCurrentPosition} = mainSlice.actions

export default mainSlice.reducer