#include <iostream>
#include <string>
#include <fstream>
using namespace std;

int main(){
	ifstream in;
	in.open("staff-compSc.txt");
	string name, link;
	while(getline(in, name)){
		cout << "insert into professor (link, faculty, course, name) values (";
		cout << "\""<< name << "\", ";
		cout << "\"engineering\", " << "\"\", ";
		getline(in, link);
		cout << "\"" << link.substr(0, link.find(",")) << "\");" << endl;
//		if (name.find("staff") != std::string::npos)
//			cout << "http://www.english.hku.hk/" << name << endl;
//		else
//			cout << name << endl;
//		getline(in, link);
//		cout << link << endl;
		
	} 
}
