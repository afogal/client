// @flow

import UpdateEmail from './email'
import UpdatePassphrase from './passphrase'
import Landing from './landing'

import type {DumbComponentMap} from '../constants/types/more'

const updateEmailBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onSave: () => console.log('onSave'),
  onResendConfirmationCode: null,
}

const updateEmailMap: DumbComponentMap<UpdateEmail> = {
  component: UpdateEmail,
  mocks: {
    'Normal': updateEmailBase,
    'Normal - No Email': {
      ...updateEmailBase,
      isVerified: false,
      email: null,
    },
    'Not Verified - No Email': {
      ...updateEmailBase,
      isVerified: false,
    },
    'Resend Confirmation': {
      ...updateEmailBase,
      onResendConfirmationCode: () => console.log('onResendConfirmationCode'),
    },
  },
}

const updatePassphraseBase = {
  onChangeCurrentPassphrase: currentPassphrase => console.log('onChangeCurrentPassphrase', currentPassphrase),
  onChangeNewPassphrase: newPassphrase => console.log('onChangeNewPassphrase', newPassphrase),
  onChangeNewPassphraseConfirm: newPassphraseConfirm => console.log('onChangeNewPassphraseConfirm', newPassphraseConfirm),
  onChangeShowPassphrase: showPassphrase => console.log('onChangeShowPassphrase', showPassphrase),
  currentPassphrase: 'swordfish',
  newPassphrase: 'open sesame',
  newPassphraseConfirm: 'open sesame',
  showTyping: false,
  errorMessage: null,
  newPassphraseError: null,
  newPassphraseConfirmError: null,
  canSave: true,
  onBack: () => console.log('onBack'),
  onSave: () => console.log('onSave'),
  onForgotPassphrase: () => console.log('onForgotPassphrase'),
}

const updatePassphraseMap: DumbComponentMap<UpdatePassphrase> = {
  component: UpdatePassphrase,
  mocks: {
    'Normal - Empty': {
      ...updatePassphraseBase,
      currentPassphrase: '',
      newPassphrase: '',
      newPassphraseConfirm: '',
      canSave: false,
    },
    'Normal': updatePassphraseBase,
    'Normal - Show Typing': {
      ...updatePassphraseBase,
      showTyping: true,
    },
    'Error - Wrong Passphrase': {
      ...updatePassphraseBase,
      errorMessage: 'Wrong current passphrase. Please try again.',
      currentPassphrase: '',
      canSave: false,
    },
    'Error - New Passphrase Requirements': {
      ...updatePassphraseBase,
      newPassphraseError: 'Your new passphrase must have minimum 12 characters.',
      newPassphraseConfirm: '',
    },
    'Error - New Passphrase Mismatch': {
      ...updatePassphraseBase,
      newPassphraseConfirmError: 'Passphrase confirmation does not match.',
    },
  },
}

const planBase = {
  onUpgrade: l => console.log('onUpgrade to', l),
  onDowngrade: l => console.log('onDowngrade to', l),
  onInfo: l => console.log('onInfo for', l),
  selectedLevel: 'Basic',
  freeSpace: '5GB',
  freeSpacePercentage: 0.5,
  lowSpaceWarning: false,
  onChangePaymentInfo: () => console.log('onChangePaymentInfo'),
  paymentInfo: null,
}

const accountBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onChangePassphrase: () => console.log('onChangePassphrase'),
}

const landingBase = {
  plan: planBase,
  account: accountBase,
}

const goldBase = {
  ...landingBase,
  plan: {
    ...planBase,
    selectedLevel: 'Gold',
    lowSpaceWarning: true,
    freeSpacePercentage: 0.9,
    paymentInfo: {
      name: 'Jessica Jones',
      last4Digits: '1337',
      isBroken: false,
    },
  },
}

const landingMap: DumbComponentMap<Landing> = {
  component: Landing,
  mocks: {
    'Normal': landingBase,
    'Normal - Not Verified email': {...landingBase, account: {...landingBase.account, isVerified: false}},
    'Gold Plan': goldBase,
    'Gold Plan - Broken Payment': {
      ...goldBase,
      plan: {
        ...goldBase.plan,
        paymentInfo: {
          ...goldBase.plan.paymentInfo,
          isBroken: true,
        },
      },
    },
  },
}

export default {
  UpdateEmail: updateEmailMap,
  UpdatePassphrase: updatePassphraseMap,
  Landing: landingMap,
}
