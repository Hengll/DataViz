// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const userName = ref('')
    const userInfo = ref('')
    const avatar = ref('')
    const role = ref(UserRole.USER)

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      userName.value = data.userName
      userInfo.value = data.userInfo
      avatar.value = data.avatar
      role.value = data.role
    }

    const logout = () => {
      token.value = ''
      account.value = ''
      userName.value = ''
      userInfo.value = ''
      avatar.value = ''
      role.value = UserRole.USER
    }

    return { token, account, userName, userInfo, avatar, role, isLoggedIn, isAdmin, login, logout }
  },
  {
    persist: {
      key: 'user',
      pick: ['token'],
    },
  },
)
