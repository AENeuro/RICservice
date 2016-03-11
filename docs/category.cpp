#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main()
{
        ifstream in("mail.php");
        string line;
        while(getline(in, line)){
        	int pos = line.find(':');
        	if (pos == -1)
        		cout << line << endl;
        	else
        		cout << line.substr(pos+1) << endl;
        }
        return 0;
}
