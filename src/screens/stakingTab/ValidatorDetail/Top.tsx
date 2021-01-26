import React, { ReactElement, useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import _ from 'lodash'

import { Text, Icon } from 'components'
import Badge from 'components/Badge'
import { ValidatorUI } from 'use-station/src'
import images from 'assets/images'
import { useValidator } from 'hooks/useValidator'

const Top = ({ ui }: { ui: ValidatorUI }): ReactElement => {
  const { profile, moniker, status, operatorAddress } = ui
  const [validatorList, setValidatorList] = useState<
    Record<string, string>
  >({})

  const { getValidatorList } = useValidator()
  useEffect(() => {
    getValidatorList().then((list) => {
      setValidatorList(list)
    })
  }, [])

  const isValidator = _.some(validatorList[operatorAddress.address])

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={profile ? { uri: profile } : images.terra}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.moniker} fontType={'bold'}>
        {moniker}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {isValidator && (
          <View style={styles.validatorIconBox}>
            <Icon name={'check'} color={'white'} />
          </View>
        )}
        <Badge
          text={status.toUpperCase()}
          containerStyle={{ backgroundColor: '#1daa8e' }}
        />
      </View>
    </View>
  )
}

export default Top

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#edf1f7',
    borderBottomWidth: 1,
  },
  profileImage: {
    borderRadius: 12,
    width: 60,
    height: 60,
    marginHorizontal: 12,
    marginBottom: 10,
  },
  moniker: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  validatorIconBox: {
    marginRight: 6,
    backgroundColor: '#5493f7',
    borderRadius: 30,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
