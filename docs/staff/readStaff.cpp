#include <iostream>
#include <string>
#include <fstream>
using namespace std;

int main(){
	ifstream in;
	in.open("fbe.html");
	string l1;
	string name, link;
	int count1 = 0;
	int count2 = 0;
	std::size_t found, found2, extra, b1, b2;
	while(getline(in, l1)){
		found = l1.find("href");
//		extra = l1.find("color=\"#555\"");
		if((found != std::string::npos)){// && (extra != std::string::npos)){ // name
//			cout << l1 << endl;
//			getline(in, l1);
			found2 = l1.find("href");
			if((found2 != std::string::npos)){
				b1 = l1.find("\"", found2);
				b2 = l1.find("\"", b1+1);
				link = l1.substr(b1+1, b2-b1-1);
				b1 = l1.find(">", b2);
				//getline(in, l1);
				//found2 = l1.find("/strong");
				b2 = l1.find("<", b1);
				name = l1.substr(b1+1, b2-b1-1);
				cout << link << endl;
				cout << name.substr(name.find(" ")+1) << endl;
			}
//			else{
//				b1 = l1.find(">");
//				b1 = l1.find(">", b1+1);
//				b1 = l1.find(">", b1+1); // the 3rd occurence
//				b2 = l1.find("<", b1);
//				link = "N/A";
//				name = l1.substr(b1+1, b2-b1-1);
//			}
		}

//		else if(found2 != std::string::npos){
//			b1 = l1.find(">");
//			b2 = l1.find("<", b1);
//			name = l1.substr(b1+1, b2-b1-1);
//			cout << name << endl;
	}
	// eee
//	while(getline(in, l1)){
//		cout << l1 << endl; // name
//		getline(in, l1); // link
//		found = l1.find("html");
//		if(found != std::string::npos)
//			cout << "http://www.eee.hku.hk/people/" << l1 << endl;
//		else
//			cout << "N/A" << endl;
//		
//	}
//	while(getline(in, l1)){
//		found = l1.find("acaname");
//		found2 = l1.find("acalink");
//		if(found != std::string::npos){ // name
//			extra = l1.find("acatitle");
//			if(extra != std::string::npos){
//				b1 = l1.find(">", extra);
//				b2 = l1.find("<", extra);
//			}
//			else{
//				b1 = l1.find(">", found);
//				b2 = l1.find("<", found);
//			}
//			name = l1.substr(b1+1, b2-b1-1);
//			cout << name << endl;
//			
//		}
//		else if(found2 != std::string::npos){ // link
//			extra = l1.find("href");
//			if(extra != std::string::npos){
//				b1 = l1.find("\"", extra);
//				b2 = l1.find("\"", b1+1);
//			}
//			else{
//				b1 = l1.find(">", found2);
//				b2 = l1.find("<", found2);
//			}
//			link = l1.substr(b1+1, b2-b1-1);
//			cout << link << endl;
//		}
//	}
//	
//	while(getline(in, l1)){
//		cout << "http://www.cs.hku.hk/people/" << l1 << endl;
//		getline(in, l1);
//		cout << l1 << endl;
//	}
//	while(getline(in, l1)){
//		found = l1.find("profile");
//		if(found != std::string::npos){
//			found2 = l1.find("\"", found);
//			link = l1.substr(found, found2-found);
//			cout << link << endl;
////			found = l1.find("href");
////			found2 = l1.find("\"", found+6);
////			link = l1.substr(found+6, found2-found-6);
//			b1 = l1.find(">", found2);
//			b2 = l1.find("<", b1);
//			name = l1.substr(b1+1, b2-b1-1);
//			cout << name << endl;
//		}
//	}
	// fine arts
//	while(getline(in, l1)){
//		found = l1.find("href");
//		if(found != std::string::npos){
//			link = l1.substr(found+5);
//			getline(in, l1);
//			found = l1.find("\"");
//			link = link + l1.substr(0, found);
//			cout << link << "\"" << endl; // link
//			//system("PAUSE");
//			int branket1 = l1.find(">", found2);
//			int branket2 = l1.find("<", branket1+1);
//			name = l1.substr(branket1+1, branket2-branket1-1);
//			cout << name << endl; // name
//		}
//		else{
////			cout << "else\n";
////			system("PAUSE");
//			cout << l1 << endl;
//			//system("PAUSE");
//			getline(in, l1);
//			name = l1.substr(57);
//			cout << name << endl; // name
//		}
//	}
	// archi
//	while(getline(in, l1)){
//		found = l1.find("href");
//		found2 = l1.find("staff-name");
//		if(found!=std::string::npos){
//			int quote1 = l1.find("\"", found);
//			int quote2 = l1.find("\"", quote1+1);
//			link = l1.substr(quote1, quote2-quote1+1);
//			cout << link << endl; // links
//			if(found2!=std::string::npos){
//				int branket1 = l1.find(">", found2);
//				int branket2 = l1.find("<", branket1+1);
//				name = l1.substr(branket1+1, branket2-branket1-2);
//				cout << name << endl; // links
//			}
//		}
//		else{
//			if(found2!=std::string::npos){
//				int branket1 = l1.find(">", found2);
//				int branket2 = l1.find("<", branket1+1);
//				name = l1.substr(branket1+1, branket2-branket1-2);
//				cout << "\"N/A\"\n";
//				cout << name << endl; // links
//			}
//		}
//		
//	}
	// FBE
//	while(getline(in,name)){
//		cout << name << endl;
//		string temp;
//		getline(in, temp);
//		getline(in, l1);
//		int one = l1.find("\"");
//		temp = "www.fbe.hku.hk" + l1.substr(one+1);
//		getline(in, l1);
//		int two = l1.find("\"");
//		temp += l1.substr(0, two);
//		cout << temp << endl;
//	}
//	while(getline(in, name)){
//		name = name.substr(32);
//		cout << name << endl;
//		getline(in, l1);
//		cout << l1 << endl;
//	}

}
