import { ROLE_IDS } from '~/utils/roles'
import { PERMISSIONS } from '~/utils/permissions'

export const ROLE_PERMISSIONS = {
  [ROLE_IDS.ADMIN]: {
    employees: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE
    ],

    equipments: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE
    ],
     inventorys: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE
    ]
  },

  [ROLE_IDS.MANAGER]: {
    employees: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE
    ],

    equipments: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE
    ],
     inventorys: [
      PERMISSIONS.VIEW,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE
    ]
  },

  [ROLE_IDS.CASHIER]: {
    employees: [PERMISSIONS.VIEW],
    equipments: [PERMISSIONS.VIEW],
    inventorys: [PERMISSIONS.VIEW]
  },

  [ROLE_IDS.BARISTA]: {
    employees: [PERMISSIONS.VIEW],
    equipments: [PERMISSIONS.VIEW],
     inventorys: [PERMISSIONS.VIEW]
  },

  [ROLE_IDS.WAITER]: {
    employees: [PERMISSIONS.VIEW],
    equipments: [PERMISSIONS.VIEW],
    inventorys: [PERMISSIONS.VIEW]
  }
}