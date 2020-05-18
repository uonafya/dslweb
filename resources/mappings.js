// Carries indicator mappings to the dashboard
export const uhc_groups = {
  'SERVICESAVAILABILITY': 5 //random unique number
}

export const uhc = {
  'groups': {}
}

// populate uhc groups: source UHC M&E framework: http://dsl.health.go.ke/uhc
uhc.groups[uhc_groups['SERVICESAVAILABILITY']] = {
  'name': 'Essential Services Availability',
  'indicators': {
    10649: {
      'name': 'under five mortality rate',
      'sourceId': 8
    },
    4871: {
      'name': 'life expectancy at birth',
      'sourceId': 8
    },
    11964: {
      'name': 'infant mortality rate',
      'sourceId': 8
    }
  }
}
