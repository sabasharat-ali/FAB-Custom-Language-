const tokens = [
  {
    classPart: "ID",
    valuePart: "aa",
    lineNo: 1
},
{
    classPart: "ID",
    valuePart: "ab",
    lineNo: 1
},
{
    classPart: "OP",
    valuePart: "=",
    lineNo: 1
},
{
    classPart: "keyword",
    valuePart: "new"
},
{
    classPart: "ID",
    valuePart: "ab",
    lineNo: 1
},
{
    classPart: "(",
    valuePart: "(",
    lineNo: 1
},
{
    classPart: ")",
    valuePart: ")",
    lineNo: 1
},
{
    classPart: ";",
    valuePart: ";",
    lineNo: 1
},
{
    classPart: "$",
    valuePart: "",
    lineNo: 1
}

]


// const semantic = () =>{
    
// }

var mainTable = []
var main_Table = []
var functionTable = []
var classLinks = []
var scope = 0;
var link = -1;

const insert_MT = (name, accessModifiers, category, parent, link) => {
    var isParent = false;
    mainTable.foreach(main_table)
    {
        if (main_Table.name == name) {
            console.log("Redeclaration of class")
            classLinks.pop(this.link);
            this.link--
            return false
        }
    }
    if (parent != 'none')
    {
        mainTable.forEach(main_Table)
        {
            if (parent === main_Table.name)
            {
                isParent = true;
                if (main_Table.category === 'sealed')
                {
                    classLinks.pop(this.link)
                    this.link--
                    console.log('Sealed class cant be inherited')
                    return false
                }
                
            }
            
        }
        if (!isParent)
        {
            console.log('Parent class is not decalred')
            classLinks.pop(this.link)
            this.link--
            return false
        }
        
    }
    mainTable.add(this)


}

const insert_FT = (name, type, scope) => {
    
}

const insert_CT = (name, type, scope) => {
    functionTable.forEach(FunctionTable)
    {
        if (FunctionTable.name === name)
        {
            if (functionTable.scope === scope)
            {
                console.log('Redeclaration of variable')
                return false
            }

        }
    }
    
}
var a=[]
const insert_CT = (name, type, accessModifiers, typeModifiers, a) => {
    {
        classTable.forEach(a)
        {
            if (a.name === name)
            {
                console.log('Redeclaration')
                return false
                }
        }
        


    }
}

const create_CT = () => {
    link++;
    var c = []
    classLinks.push(c)
}

const lookup_MT = (name, category, parents) => {
    mainTable.forEach(MainTable)
    {
        if (MainTable.name === name)
        {
            category = MainTable.category
            parents = MainTable.parent
            return 'class'
            }
    }
    category = ""
    parents = ""
    return "class not declared"
}

const lookupAttr_CT = (link, name, AM, TM) => {
        
}