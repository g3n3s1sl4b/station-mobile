import React, { FC } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { hasNotch } from 'react-native-device-info'

import { API } from 'use-station/src'
import { Icon } from 'components'
import color from 'styles/color'

interface Props extends Partial<API<any>> {
  title: string
}

/**
 * TAB Navigation 화면
 * Header View와 ScrollView로 구성
 */
const Page: FC<Props> = ({ loading, error, title, children }) => {
  // console.log("Page Load:", {loading, error, title, children})
  const { navigate } = useNavigation()
  const insets = useSafeAreaInsets()

  /**
   * 이 값을 어디서 컨트롤 할 수 있을지 확인 필요함
   */
  const isAuth = false

  return (
    <View style={{ flex: 1, marginTop: hasNotch() ? insets.top : 0 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {
            // !auth
            isAuth ? null : (
              <TouchableOpacity
                onPress={(): void => navigate('AuthMenu')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 10,
                    borderColor: '#2043b5',
                    borderWidth: 2,
                    borderRadius: 14,

                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}
                >
                  <Icon
                    name="account-balance-wallet"
                    size={14}
                    color="#2043b5"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.connectText}>CONNECT</Text>
                </View>
              </TouchableOpacity>
            )
          }

          <TouchableOpacity onPress={(): void => navigate('Setting')}>
            {
              /** 인증이 되지 않았으면 CONNECT와 SETTINGS버튼, 인증 되어 있으면 WALLET버튼 */
              // !auth
              isAuth ? (
                <Icon
                  name="account-balance-wallet"
                  size={28}
                  color="#2043b5"
                />
              ) : (
                <Icon name="settings" size={24} color="#2043b5" />
              )
            }
          </TouchableOpacity>
        </View>
      </View>

      {error ? (
        <Text>{error.message}</Text>
      ) : loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator animating size="large" color="#aaa" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 20 }}>
            {children}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: color.sapphire,
    fontSize: 24,
    lineHeight: 36,
    alignSelf: 'center',
  },
  connectText: {
    color: color.sapphire,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: -0.4,
  },
})
