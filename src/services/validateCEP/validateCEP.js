export default function validarCepPorEstado(cep, indexEstado, estados){

  const rangeCepPorEstado = {
    SP: [1000000, 19999999],
    RJ: [20000000, 28999999],
    ES: [29000000, 29999999],
    MG: [30000000, 39999999],
    BA: [40000000, 48999999],
    SE: [49000000, 49999999],
    PE: [50000000, 56999999],
    AL: [57000000, 57999999],
    PB: [58000000, 58999999],
    RN: [59000000, 59999999],
    CE: [60000000, 63999999],
    PI: [64000000, 64999999],
    MA: [65000000, 65999999],
    PA: [66000000, 68899999],
    AP: [68900000, 68999999],
    AM: [69000000, 69299999, 69400000, 69899999],
    AC: [69900000, 69999999],
    RO: [76800000, 76999999],
    TO: [77000000, 77999999],
    DF: [70000000, 72799999, 73000000, 73699999],
    GO: [72800000, 72999999, 73700000, 76799999],
    MT: [78000000, 78899999],
    MS: [79000000, 79999999],
    PR: [80000000, 87999999],
    SC: [88000000, 89999999],
    RS: [90000000, 99999999],
    RR: [69300000, 69399999]
  }

  const ufEstadoRemetente = estados.find(est => est.id === Number(indexEstado))
  const cepFormatado = cep.replace(/[^0-9]/g, '')

  let cepInf1, cepSup1, cepInf2, cepSup2 = 0

  switch (ufEstadoRemetente.sigla) {
    case 'RJ':
      [cepInf1, cepSup1] = rangeCepPorEstado.RJ
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'SP':
      [cepInf1, cepSup1] = rangeCepPorEstado.SP
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'ES':
      [cepInf1, cepSup1] = rangeCepPorEstado.ES
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'MG':
      [cepInf1, cepSup1] = rangeCepPorEstado.ES
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'RS':
      [cepInf1, cepSup1] = rangeCepPorEstado.RS
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'SC':
      [cepInf1, cepSup1] = rangeCepPorEstado.SC
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'PR':
      [cepInf1, cepSup1] = rangeCepPorEstado.PR
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'DF':
      [cepInf1, cepSup1, cepInf2, cepSup2] = rangeCepPorEstado.DF
      return ((Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1) ||
        (Number(cepFormatado) >= cepInf2 && Number(cepFormatado) <= cepSup2))
    case 'GO':
      [cepInf1, cepSup1, cepInf2, cepSup2] = rangeCepPorEstado.GO
      return ((Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1) ||
        (Number(cepFormatado) >= cepInf2 && Number(cepFormatado) <= cepSup2))
    case 'MS':
      [cepInf1, cepSup1] = rangeCepPorEstado.MS
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'MT':
      [cepInf1, cepSup1] = rangeCepPorEstado.MT
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'BA':
      [cepInf1, cepSup1] = rangeCepPorEstado.BA
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'PE':
      [cepInf1, cepSup1] = rangeCepPorEstado.PE
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'SE':
      [cepInf1, cepSup1] = rangeCepPorEstado.SE
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'PB':
      [cepInf1, cepSup1] = rangeCepPorEstado.PB
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'CE':
      [cepInf1, cepSup1] = rangeCepPorEstado.CE
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'AL':
      [cepInf1, cepSup1] = rangeCepPorEstado.AL
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'RN':
      [cepInf1, cepSup1] = rangeCepPorEstado.RN
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'PI':
      [cepInf1, cepSup1] = rangeCepPorEstado.PI
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'MA':
      [cepInf1, cepSup1] = rangeCepPorEstado.MA
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'TO':
      [cepInf1, cepSup1] = rangeCepPorEstado.TO
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'PA':
      [cepInf1, cepSup1] = rangeCepPorEstado.PA
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'AP':
      [cepInf1, cepSup1] = rangeCepPorEstado.AP
      return Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1
    case 'AM':
      [cepInf1, cepSup1, cepInf2, cepSup2] = rangeCepPorEstado.AM
      return ((Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1) ||
        (Number(cepFormatado) >= cepInf2 && Number(cepFormatado) <= cepSup2))
    case 'AC':
      [cepInf1, cepSup1] = rangeCepPorEstado.AC
      return (Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1)
    case 'RO':
      [cepInf1, cepSup1] = rangeCepPorEstado.RO
      return (Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1)
    case 'RR':
      [cepInf1, cepSup1] = rangeCepPorEstado.RR
      return (Number(cepFormatado) >= cepInf1 && Number(cepFormatado) <= cepSup1)
    default:
      break;
  }
} 
