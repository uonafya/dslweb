// Carries indicator mappings to the dashboard
export const uhc_groups = {
  'SERVICESAVAILABILITY': 1, //random unique number
  'EssentialServicesCoverage': 2,
  'FinancialRiskProtection': 3,
  'ServiceSatisfaction': 4,
  'Effectiveness': 5,
  'OtherSDGsHealthInterventions': 6,
  'AccesstoEssentialServices': 7,
  'QualityofEssentialServices': 8,
  'HealthFinancing': 9,
  'HealthInfrastructure': 10,
  'MedicinesProductsSupplies': 11,
  'SERVICESAVAILABILITY': 12,
  'BurdenofDisease': 13,
  'BurdenofRiskFactors': 14,
  'HealthyLife': 15,
  'HealthWorkforce': 16,
  'HealthGovernance': 17,
  'HealthInformation': 18,
  'DemandforEssentialServices': 19,
  'ResilienceinEssentialServicesProvision': 20,
  'NationalandSubnationalServiceDeliverySystems': 21
}

export const uhc = {
  'groups': {}
}

uhc.groups[uhc_groups['EssentialServicesCoverage']] = {
  'name': 'Essential Services Coverage',
  'indicators': {
    7635: {
      'name': 'TB treatment coverage',
      'sourceId': 3
    },
  }
}

uhc.groups[uhc_groups['FinancialRiskProtection']] = {
  'name': 'Financial Risk Protection',
  'indicators': {
    8413: {
      'name': 'Out of pocket expenditure for health as percent of total health expenditure (2015/16)',
      'sourceId': 5
    },
    8344: {
      'name': 'Percentage of population enrolled in some form of health insurance',
      'sourceId': 5
    },
    1457: {
      'name': 'Percentage of population incurring CHE (Current Health Expenditure)',
      'sourceId': 5
    }
  }
}
uhc.groups[uhc_groups['ServiceSatisfaction']] = {
  'name': 'Service Satisfaction',
  'indicators': {}
}
uhc.groups[uhc_groups['Effectiveness']] = {
  'name': 'Effectiveness',
  'indicators': {
    4871: {
      'name': 'life expectancy at birth',
      'sourceId': 8
    },
    2578: {
      'name': 'EMTCT rate',
      'sourceId': 2
    },
    11964: {
      'name': 'infant mortality rate',
      'sourceId': 8
    },
    8299: {
      'name': 'neonatal mortality rate',
      'sourceId': 8
    }
  }
}

uhc.groups[uhc_groups['OtherSDGsHealthInterventions']] = {
  'name': 'Other SDGs Health Interventions',
  'indicators': {
    3043: {
      'name': 'Incidence of adults involved in Road Traffic accidents in the preceding year',
      'sourceId': 7
    },
    6790: {
      'name': 'percentage of women first married at age: 18',
      'sourceId': 8
    },
    11311: {
      'name': 'percentage of men ever experienced sexual violence',
      'sourceId': 8
    },
    9058: {
      'name': 'percentage of women ever experienced sexual violence',
      'sourceId': 8
    },
    9186: {
      'name': 'percentage of women circumcised',
      'sourceId': 8
    },
    10115: {
      'name': 'adolescent birth rate',
      'sourceId': 8
    }
  }
}

uhc.groups[uhc_groups['AccesstoEssentialServices']] = {
  'name': 'Access to Essential Services',
  'indicators': {
    3958: {
      'name': 'Percentage screened for cervical cancer',
      'sourceId': 7
    },
    3958: {
      'name': 'Percentage screened for cervical cancer',
      'sourceId': 7
    },
    6578: {
      'name': 'percentage of population within 5 km of a health facility',
      'sourceId': 5
    },
  }
}

uhc.groups[uhc_groups['QualityofEssentialServices']] = {
  'name': 'QualityofEssentialServices',
  'indicators': {
    6578: {
      'name': 'percentage of population within 5 km of a health facility',
      'sourceId': 5
    }
  }
}

uhc.groups[uhc_groups['HealthFinancing']] = {
  'name': 'Other SDGs Health Interventions',
  'indicators': {
    10194: {
      'name': 'Public spending on health as percentage of GDP  (2015/16)',
      'sourceId': 5
    }
  }
}

uhc.groups[uhc_groups['HealthInfrastructure']] = {
  'name': 'Health Infrastructure',
  'indicators': {
    9237: {
      'name': 'Percentage of facilities providing Basic Emergency Obstetric Care (BEmONC) services',
      'sourceId': 6
    }
  }
}

uhc.groups[uhc_groups['MedicinesProductsSupplies']] = {
  'name': 'Medicines, Products & Supplies',
  'indicators': {
    9678: {
      'name': 'Availability of tracer essential medicines (%)',
      'sourceId': 6
    },
    10327: {
      'name': 'Availability of tracer basic equipment (%)',
      'sourceId': 6
    },
    3565: {
      'name': 'Availability of tracer Diagnostics(%)',
      'sourceId': 6
    }
  }
}

// populate uhc groups: source UHC M&E framework: http://dsl.health.go.ke/uhc
uhc.groups[uhc_groups['SERVICESAVAILABILITY']] = {
  'name': 'Essential Services Availability',
  'indicators': {

  }
}

uhc.groups[uhc_groups['BurdenofDisease']] = {
  'name': 'Burden of Disease',
  'indicators': {
    751: {
      'name': 'Hiv prevalence rate',
      'sourceId': 4
    },
    9682: {
      'name': 'NCDs Mortality Rate',
      'sourceId': 7
    },
    5035: {
      'name': 'NCDs Mortality Rate cancer',
      'sourceId': 7
    },
    9538: {
      'name': 'TB Mortality rate (PER 100 000 POPULATION)',
      'sourceId': 3
    },
    751: {
      'name': 'HIV prevalence rate',
      'sourceId': 2
    },
    4003: {
      'name': 'prevalence of diabetes in adults',
      'sourceId': 7
    },
    4210: {
      'name': 'Hiv prevalence rate',
      'sourceId': 7
    },
    10649: {
      'name': 'under five mortality rate',
      'sourceId': 8
    },
    9530: {
      'name': 'Percentage of raised blood sugar taking medication',
      'sourceId': 7
    }

  }
}

uhc.groups[uhc_groups['BurdenofRiskFactors']] = {
  'name': 'Burden of Risk Factors',
  'indicators': {
    5167: {
      'name': 'exclusively breastfed',
      'sourceId': 8
    },
    3124: {
      'name': 'Proportion of people who use tobacco',
      'sourceId': 7
    },
    9675: {
      'name': 'Prevalence of raised total cholesterol',
      'sourceId': 7
    },
    9079: {
      'name': 'Prevalence of over-weight',
      'sourceId': 7
    },
    5117: {
      'name': 'Prevalence of Obesity',
      'sourceId': 7
    },
    7849: {
      'name': 'Level of total physical activity (low)',
      'sourceId': 7
    }
  }
}

uhc.groups[uhc_groups['HealthyLife']] = {
  'name': 'Healthy Life',
  'indicators': {
    7954: {
      'name': 'height-for-age percent-age below -2 sd (Stunted)',
      'sourceId': 8
    },
    11265: {
      'name': 'weight-for-age percent-age below -2 sd (Underweight)',
      'sourceId': 8
    },
    4371: {
      'name': 'total fertility rate',
      'sourceId': 8
    }
  }
}

uhc.groups[uhc_groups['HealthWorkforce']] = {
  'name': 'Health Workforce',
  'indicators': {}
}

uhc.groups[uhc_groups['HealthGovernance']] = {
  'name': 'Health Governance',
  'indicators': {}
}

uhc.groups[uhc_groups['HealthInformation']] = {
  'name': 'Health Information',
  'indicators': {}
}

uhc.groups[uhc_groups['DemandforEssentialServices']] = {
  'name': 'Demand for Essential Services',
  'indicators': {}
}

uhc.groups[uhc_groups['ResilienceinEssentialServicesProvision']] = {
  'name': 'Resilience in Essential Services Provision',
  'indicators': {}
}

uhc.groups[uhc_groups['NationalandSubnationalServiceDeliverySystems']] = {
  'name': 'National and Sub-national Service Delivery Systems',
  'indicators': {}
}
