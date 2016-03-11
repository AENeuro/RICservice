#include <iostream>
#include <fstream>
#include <string>

using namespace std;

ifstream fin("originalHtml.txt");
ofstream fout("addBackSlash.txt");
int main(){
        string x;
        while(getline(fin, x)){
                int l = x.length();
                bool flag = false;
                fout << "html += \"";
                for(int i = 0; i < l; i ++){
                        if(!flag && (x[i] == ' ' || x[i] == '\t')){
                                continue;
                        }
                        flag = true;
                        if(x[i] == '\"')
                                fout << "\\\"";
                        else
                                fout << x[i];
                }
                fout << "\";\n";
        }
        return 0;
} 

