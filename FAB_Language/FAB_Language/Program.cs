using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using System.Text.RegularExpressions;

namespace CompilerProject
{
    class Program
    {
        static void Main(string[] args)
        {
            //string[,] DT = new string[,] { { "int", "DataType" }, { "double","DataType"}, { "char", "DataType" }, { "string", "DataType" }, { "bool", "DataType" },
            //                                 {"while","while"}, { "switch","switch"}, {"case","case"}, {"foreach", "foreach"},{"default","default"},{"return","return"},
            //                                 { "label","label"}, { "goto","goto"}, { "break","break"}, { "continue","continue"}, { "new","new"}, { "void","void"},{ "if","if"},
            //                                 { "else","else"},{ "public","public"}, { "private","private"}, { "class","class"}, { "main","main"}, { "abstract","abstract"},
            //                                 { "final","final"}, { "static","static"},{"virtual","virtual"},{"override","override"} };
            //for(int f=0; f<DT.Length; f++)
            //{
            //    for (int g = 0; g<DT.Length;g++)
            //    Console.WriteLine(DT[f,g]);
            //}

            string[,] keyWords = new string[,] { { "int", "DataType" }, { "double","DataType"}, { "char", "DataType" }, { "string", "DataType" }, { "bool", "DataType" },
                                             {"while","while"}, { "switch","switch"}, {"case","case"}, {"foreach", "foreach"},{"default","default"},{"return","return"},
                                             { "label","label"}, { "goto","goto"}, { "break","break"}, { "continue","continue"}, { "new","new"}, { "void","void"},{ "if","if"},
                                             { "else","else"},{ "public","public"}, { "private","private"}, { "class","class"}, { "main","main"}, { "abstract","abstract"},
                                             { "final","final"}, { "static","static"},{"virtual","virtual"},{"override","override"} };

            //FUNCTIONS

            //Regex q1 = new Regex("^[a-z A-Z]{1}[a-z A-Z 0-9 _ - .][a-z A-Z 0-9]*$");
            
            //bool CheckIdentifier(string check)
            //{

            //    if (q1.IsMatch(check))
            //    {
            //        Console.WriteLine("True");
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}

  /*          string GetKeywordClassPart(string classpart)
            {
                for (int a = 0; a < keyWords.Length; a++)
                {
                    if (classpart == keyWords[a, 0])
                    {
                        Console.WriteLine(keyWords[a, 1]);
                        //return keyWords[a, 1].ToString();
                    }
                    else
                    {
                        Console.WriteLine("it is an identifier");
                    }
                }
            } */







            string[,] token = new string[100, 3];
            ArrayList al = new ArrayList();
            int line = 1;
            int no = 0;
            string text = File.ReadAllText("code.txt");
            //string[] textSplit = text.Split(" ");
            //for (int b = 0; b < textSplit.Length; b++)
            //{
            //    Console.WriteLine(b);
             for (int i = 0; i < text.Length; i++)
             {

                //Console.WriteLine($"{text[i]} {token[no,1]} {line}");
                if (text[i] == '\r')

                    line++;

                //FOR STRING
                else if (text[i] == '\"')
                {
                    i++;
                    do
                    {
                        //Console.Write($"{i},{text[i]} ");
                        token[no, 0] += text[i];
                        token[no, 1] = line.ToString();
                        int length = text.Length - 2;
                        string toPrint = text.Substring(1, length);
                        Console.WriteLine("CP: str_const");
                        Console.WriteLine("VP: " + toPrint);
                        Console.WriteLine("Line No: " + token[no, 1]);
                        break;


                    } while (text[++i] != '\"' && text[i] != '\r' && text[i] != '\"');
                    if (text[i] == ' ')
                    {
                        no++;
                    }
                    break;

                }


                //FOR SINGLE COMMENT
                else if (text[i].Equals('/'))
                {
                    Console.WriteLine("Single line comment. No token generated!");
                    if (text[i + 1].Equals('/'))
                    {
                        do
                        {
                            if (text[i] == '\r')
                                line++;
                            i++;
                        } while (text[i] != '/' && text[i + 1] != '/'); line++;
                    }
                    do
                    {
                        i++;
                    } while (text[i] != '\r'); line++;
                }

                //FOR KEYWORD AND IDENTIFIER
                else if (Char.IsLetter(text[i]))
                {
                    do
                    {
                        token[no, 0] += text[i];
                        token[no, 1] = line.ToString();
                        if (!string.IsNullOrEmpty(text))
                        {
                            for (int a = 0; a < text.Length; a++)
                            {
                                if (text == keyWords[a, 0])
                                {
                                    token[no, 1] = keyWords[a, 1];
                                    token[no, 2] = line.ToString();
                                    Console.WriteLine("CP: " + token[no, 1]);
                                    Console.WriteLine("VP: " + text);
                                    Console.WriteLine("Line No: " + token[no, 2]);
                                    text = null;

                                }
                            }
                            token[no, 2] = line.ToString();
                            Console.WriteLine("CP: ID");
                            Console.WriteLine("VP: " + text);
                            Console.WriteLine("Line No: " + token[no, 2]);
                            text = null;
                        }
                        break;
                    } while (!Char.IsSymbol(text[i + 1]) && ++i != text.Length && text[i] != ' ' && text[i] != '\r');
                    if (text[i] == '\r')
                        line++;
                    no++;

                }


                // FOR DIGITS
                else if (Char.IsDigit(text[i]))
                {

                    do
                    {
                        token[no, 0] += text[i];
                        token[no, 1] = "int";
                        token[no, 2] = line.ToString();
                        Console.WriteLine("CP: " + token[no, 0]);
                        Console.WriteLine("VP: " + token[no, 1]);
                        Console.WriteLine("Line No: " + token[no, 2]);
                        //Console.WriteLine($"Token: {token[no,0}, {token[no,1]} , {token[no,2]}");
                    } while (Char.IsDigit(text[++i]) || text[i] == '.');
                    no++;
                    if (text[i] == '\r')
                        line++;
                    else i--;
                }


                //FOR OPERATORS
                else if (((text[i] == '+') || (text[i] == '-') || text[i] == '*' || text[i] == '/' || text[i] == '%'
                    || text[i] == '=' || text[i] == '<' || text[i] == '>') && (text.Length == 1)) // +-*/=%
                {
                    token[no, 0] += text[i];
                    token[no, 1] = "OP";
                    token[no, 2] = line.ToString();
                    Console.WriteLine("CP: " + token[no, 0]);
                    Console.WriteLine("VP: " + token[no, 1]);
                    Console.WriteLine("Line No: " + token[no, 2]);
                }
                else if (text[i + 1] == '=') // += -= *= /= == %=
                {
                    token[no, 0] += text[no].ToString() + text[no + 1].ToString();
                    token[no, 1] = "AOP";
                    token[no, 2] = line.ToString();
                    Console.WriteLine("CP: " + token[no, 0]);
                    Console.WriteLine("VP: " + token[no, 1]);
                    Console.WriteLine("Line No: " + token[no, 2]);
                }
                else if ((text[i] == '+' && text[i + 1] == '+') || (text[i] == '-' && text[i + 1] == '-')) //++ --
                {
                    token[no, 0] += text[no].ToString() + text[no + 1].ToString();
                    token[no, 1] = "INC_DEC";
                    token[no, 2] = line.ToString();
                    Console.WriteLine("CP: " + token[no, 0]);
                    Console.WriteLine("VP: " + token[no, 1]);
                    Console.WriteLine("Line No: " + token[no, 2]);
                }



                // FOR PUNCTUATORS
                else if (Char.IsPunctuation(text[i]))
                {
                    token[no, 0] += text[i];
                    token[no, 1] = "PUNCTUATOR";
                    token[no, 2] = line.ToString();
                    Console.WriteLine("CP: " + token[no, 0]);
                    Console.WriteLine("VP: " + token[no, 1]);
                    Console.WriteLine("Line No: " + token[no, 2]);
                }
             }
            
        }
    }
    

}

    class Words
    {
        string[,] keyWords = new string[,] { { "int", "DataType" }, { "double","DataType"}, { "char", "DataType" }, { "string", "DataType" }, { "bool", "DataType" },
                                             {"while","while"}, { "switch","switch"}, {"case","case"}, {"foreach", "foreach"},{"default","default"},{"return","return"},
                                             { "label","label"}, { "goto","goto"}, { "break","break"}, { "continue","continue"}, { "new","new"}, { "void","void"},{ "if","if"},
                                             { "else","else"},{ "public","public"}, { "private","private"}, { "class","class"}, { "main","main"}, { "abstract","abstract"},
                                             { "final","final"}, { "static","static"},{"virtual","virtual"},{"override","override"} };
        string[] punctuator = new string[] { "{", "}", "[", "]", "(", ")", ".", ",", "?", ":", "\"" };

        string[,] operators = new string[,] {{"+","PM"}, { "-", "PM" }, { "*", "PM" }, { "/", "PM" },
                                             { "+", "PM" }, {"*=","CO"}};
    
    }



