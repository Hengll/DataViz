// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const id = ref('')
    const account = ref('')
    const userName = ref('')
    const userInfo = ref('')
    const avatar = ref('')
    const theme = ref('lightTheme')
    const language = ref('zhHant')

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      id.value = data.id
      account.value = data.account
      userName.value = data.userName
      userInfo.value = data.userInfo
      avatar.value = data.avatar
    }

    const logout = () => {
      token.value = ''
      id.value = ''
      account.value = ''
      userName.value = ''
      userInfo.value = ''
      avatar.value = ''
    }

    const changeTheme = () => {}

    return {
      token,
      id,
      account,
      userName,
      userInfo,
      avatar,
      theme,
      language,
      isLoggedIn,
      login,
      logout,
      changeTheme,
    }
  },
  {
    persist: {
      key: 'user',
      pick: ['token', 'theme', 'language'],
    },
  },
)
