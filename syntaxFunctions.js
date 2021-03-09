const { SSL_OP_LEGACY_SERVER_CONNECT, SSL_OP_NO_TLSv1_1, SSL_OP_NO_TLSv1_2 } = require("constants")

const CP = tokens[index].classPart
const T = () => {
    if (
        CP === 'ID' ||
        CP === 'int_const' ||
        CP === 'float_const' ||
        CP === 'str_const' ||
        CP === 'char_const' ||
        CP === '(' ||
        CP === '!' ||
        CP === 'inc_dec' ||
    ) {
        if (F()) {
            if (Td()) {
                return true
            }
        } return false

    }
}

const Td = () => {
    if (CP === 'MDM') {
        index++
        if (F())
        {
            if (T()) {
                return true
            }
        }
        else if (
            CP === 'PM' ||
            CP === ';' ||
            CP === 'ROP' ||
            CP === ')' ||
            CP === '&&' ||
            CP === '||' ||
            CP === ',' ||
            CP === ']' ||

        ) {
            index++
        }
    }return false
}

const F = () => {
    if (CP === 'ID') {
        index++
        if (call()) {
            return true
        }
    } else if (
        CP === 'int_const' ||
        CP === 'float_const' ||
        CP === 'str_const' ||
        CP === 'char_const' ||
    ) {
        if (const()) {
            return true
        }
    } else if (
        CP === '('
    ) {
        if (OE()) {
            return true
        }
    } else if (
        CP === '!'
    ) {
        index++
        if (F()) {
            return true
        }
    } else if (
        CP === 'inc_dec'
    ) {
        index++
        if (CP === 'ID') {
            index++
            if (X()) {
                return true
            }
        }
    }return false
}

const call = () => {
    if (
        CP === 'MDM' ||
        CP === 'PM' ||
        CP === 'ROP' ||
        CP === ')' ||
        CP === '&&' ||
        CP === '||' ||
        CP === ',' ||
        CP === ']' ||

    ) {
        index++
    } else if (
        CP === '(' ||
        CP === '[' ||
        CP === '.' ||

    ) {
        if (X_Y) {
            return true
        }
    }return false
}

const func_st = () => {
    if (CP === 'DT') {
        index++
        if (CP === 'AM') {
            if (CP === 'DT') {
                if (CP === 'DT') {
                    if (CP === 'ID')
                    {
                        if (CP === '(')
                            index++
                        if (PL()) {
                            if (CP === ')') {
                                if (body()) {
                                    return true
                                }
                            }
                        }
                        }
                }
            }
        }
    }return false
}

const arr = () => {
    if (CP === 'DT') {
        index++
        if (CP === '[') {
            if (OE()) {
                if (CP === ']')
                {
                    index++
                    if (CP === 'ID')
                        index++
                    if (arr_list()) {
                        return true
                    }
                    }
            }
        }
    }return false
}

const arr_list = () => {
    if (CP === ';') {
        index ++
    } else if (CP === '=') {
        index++
        if (CONST()) {
            if (arr_continue()) {
                return true
            }
        }
    }return false
}

const arr_continue = () => {
    if (
        CP === '=' ||
        CP === '.'
    ) {
        index++
        if (CP === ',') {
            index++
            if (CONST()) {
                if (arr_continue()) {
                    return true
                }
            }
        }
    }return false
}

const arr_call = () => {
    if (CP === 'ID') {
        index++
        if (CP === '[') {
            index++
            if (OE()) {
                return true
            }
        }
    } else false
}

const While = () => {
    if (CP === 'while') {
        index++
        if (CP === '{') {
            index++
            if (OE()) {
                if (CP === '}') {
                    if (body()) {
                        return true
                    }
                }
            }
        }
    }return false
}

const Do_while = () => {
    if (CP === 'do') {
        index++
        if (CP === '{') {
            index++
            if (MST()) {
                if (CP === '}')
                {
                    if (While()) {
                        return true
                    }
                    }
            }
        }
    }return false
}

const If = () => {
    if (CP === 'if') {
        index++
        if (CP === '{')
        {
            if (OE()) {
                if (CP === '}') {
                    if (body()) {
                        return true
                    }
                }
            }
        }
    }return false
}

const If_else = () => {
    if (CP === 'if') {
        if (If()) {
            if (oelse()) {
                return true
            }
        }
    }return false
}

const oelse = () => {
    if (CP === 'else') {
        index++
        if (body()) {
            return true
        }
    } else if (
        CP === 'ID' ||
        CP === 'if' ||
        CP === 'for' ||
        CP === 'do' ||
        CP === 'inc_dec' ||
        CP === '}' ||
        CP === 'while' 
    ) {
        return true;
    } return false
}

const inc_dec = () => {
    if (CP === 'inc_dec') {
        index++
        if (CP === 'ID') {
            if (X())
            {
                return true
            }
        } else if (CP === 'ID')
        {
            index++
            if (X()) {
                if (CP === 'inc_dec') {
                    return true
                }
            }
        }
    }return false
}

const Class_st = () => {
    if (
        CP === 'AM' ||
        CP === 'abstract'
    ) {
        if (Class()) {
            return true
        } else {
            if (abstract_class()) {
                return true
            }
        }
    }return false
}

const Class = () => {
    if (CP === 'AM') {
        index++
        if (CP === 'class') {
            index++
            if (CP === '(')
            {
                if (ID()) {
                    if (CP === ')') {
                        index++
                        if (class_inherit()) {
                            if (CP === '{') {
                                index++
                                if (class_body()) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        } else if (CP === 'abstract')
        {
            return true
        }
    }return false
}

const class_body = () => {
    if (
        CP === 'DT' ||
        CP === '=' ||
        CP === 'AM' ||
        CP === 'null' 
    ) {
        if (SST1()) {
            return true
        }
    } else if(
        CP === 'DT' ||
        CP === '=' ||
        CP === 'AM' ||
        CP === 'null' 
    ){
        if (MST1()) {
            return true
        }
    }else if (CP === 'AM') {
        if (CP === 'AM') {
            index++
            if (CP === 'override') {
                index++
                if (CP === 'DT') {
                    index++
                    if (CP === 'ID') {
                        index++
                        if (CP === '(')
                        {
                            index++
                            if (CP === ')') {
                                index++
                            } else {
                                return false
                            }
                        }
                    }
                }
            }
        }
    }return false
}

const MST1 = () => {
    if (CP === 'DT') {
        index++
        if (SST2()) {
            return true
        }
    } else if (CP === '=') {
        index++
        if (CP === '(') {
            index++
            if (OE()) {
                return true
            }
        }
    } else if (CP === 'AM') {
        index++
        if (CP === 'ID') {
            index++
            if (CP === '(') {
                if (PL()) {
                    return true
                }
            }
        }
    } else if (CP === '}') {
        return true
    }return false
}

const SST1 = () => {
    if (CP === 'DT') {
        index++
        if (SST2()) {
            return true
        }
    } else if (CP === '=') {
        index++
        if (OE()) {
            return true
        }
    } else if (CP === '}')
    {
        return true
    } else if (CP === 'AM') {
        index++
        if (CP === 'ID') {
            index++
            if (CP === '(')
            {
                if (PL()) {
                    return true
                }
            }
        }
    }return false
}

const SST2 = () => {
    if (CP === 'ID') {
        index++
        if (SST3()) {
            return true
        }
    }return false
}

const SST3 = () => {
    if (CP === '=' || CP === ',') {
        if (CINIT()) {
            if (CLIST()) {
                return true
            }
        }
    } else if (CP === '(') {
        index++
        if (PL()) {
            if (CP === ')')
                index++
            if (CP === '{') {
                if (body()) {
                    return true
                }
            }
        }
    }return false
}

const CINIT = () => {
    if (CP === '=') {
        index++
        if (OE()) {
            return true
        }
    } else if (CP === ';' || CP === ',') {
        return true
    }return false
}

const CLIST = () => {
    if (CP === ';') {
        index++
        return true
    } else if (CP === ',') {
        index++
        if (CP === 'ID') {
            index++
            if (CINIT())
            {
                if (CLIST()) {
                    return true
                }
            }
        }
    }return false
}

const X = () => {
    if (
        CP === '=' ||
        CP === 'PM' ||
        CP === 'MDM' ||
        CP === ';' ||
        CP === 'ROP' ||
        CP === '&&' ||
        CP === '||' ||
        CP === ',' ||
        CP === ']' ||
        CP === ')' ||
        CP === 'ID' ||
        CP === 'int_const' ||
        CP === 'str_const' ||
        CP === 'float_const' ||
        CP === 'char_const' ||
        CP === '(' ||
        CP === '!' ||
        CP === 'inc_dec' ||
        
    ) {
        index++
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (X()) {
                return true
            }
        }
    } else if (CP === '[' || CP === '(') {
        if (ArrIndex_call()) {
            return true
        }
    }return false
}

const dotIDX = () => {
    if(
        CP === '=' ||
        CP === 'PM' ||
        CP === 'MDM' ||
        CP === ';' ||
        CP === 'ROP' ||
        CP === '&&' ||
        CP === '||' ||
        CP === ',' ||
        CP === ']' ||
        CP === ')' ||
        CP === 'ID' ||
        CP === 'int_const' ||
        CP === 'str_const' ||
        CP === 'float_const' ||
        CP === 'char_const' ||
        CP === '(' ||
        CP === '!' ||
        CP === 'inc_dec' ||
        
    ) {
        index++
        
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (X()) {
                return true
            }
        }
    } else if (CP === '[' || CP === '(') {
        if (ArrIndex_call()) {
            return true
        }
    }return false
}

const ArrIndex_call = () => {
    if (CP === '[') {
        index++
        if (OE()) {
            if (CP === ']') {
                index++
                if (dotIDX) {
                    return true
                }
            }
        }
    } else if (CP === '(') {
        index++
        if (Args()) {
            index++
            if (CP === ')') {
                index++
                if (CP === '.') {
                    index++
                    if (CP === 'ID') {
                        index++
                        if (X()) {
                            return true
                        }
                    }
                }
            }
        }
    }return false
}

const XY = () => {
    if (CP === '(') {
        index++
        {
            if (Args()) {
                if (CP === ')')
                {
                    index++
                    if (NT()) {
                        return true
                    }
                }
            }
        }
    } else if (CP === '[') {
        index++
        if (OE()) {
            if (CP === ']') {
                index++
                if (NT2()) {
                    return true
                }
            }
        }
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (XY()) {
                return true
            }
        }
    } else if (
        CP === '=' ||
        CP === 'PM' ||
        CP === 'MDM' ||
        CP === 'inc_dec' ||
        CP === 'ID' 

    ) {
        if (Asgn_inc) {
            return true
        }
    }return false
}

const NT = () => {
    if (
        CP === ';' ||
        CP === 'MDM' ||
        CP === 'PM' ||
        CP === 'ROP' ||
        CP === ')' ||
        CP === '&&' ||
        CP === '||' ||
        CP === ',' ||
        CP === ']' 
        
    ) {
        index++
    } else if (CP === '.') {
        index++
        if (CP === 'ID')
        {
            index++
            if (XY()) {
                return true
            }
        }
    }return false
}

const Asgn_inc = () => {
    if (CP === '=' || CP === 'PM' || CP === 'MDM') {
        if (Asgn_op()) {
            if (OE()) {
                return true
            }
        }
    } else if (CP === 'inc_dec' || CP === 'ID') {
        index++
        return true
    }return false
}

const X_Y = () => {
    if (CP === '(') {
        index++
        if (Args()) {
            if (N_T()) {
                return true
            }
        }
    } else if (CP === '[') {
        index++
        if (OE()) {
            if (CP === ']')
            {
                index++
                if (N_T2()) {
                    return true
                }
            }
        }
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (X_Y()) {
                return true
            }
        }
    }return false
}

const N_T = () => {
    if (
        CP === ';' ||
        CP === 'MDM' ||
        CP === 'PM' ||
        CP === 'ROP' ||
        CP === ')' ||
        CP === '&&' ||
        CP === '||' ||
        CP === ',' ||
        CP === ']'

    ) {
        index++
        return true
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (X_Y()) {
                return true
            }
        }
    }return false
}

const N_T2 = () => {
    if (CP === 'inc_dec' || CP === 'ID') {
        if (inc_dec()) {
            return true
        }
    } else if (CP === '.') {
        index++
        if (CP === 'ID') {
            index++
            if (X_Y()) {
                return true
            }
        }
    }return false
}