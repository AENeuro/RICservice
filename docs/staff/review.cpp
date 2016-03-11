#include <iostream>
#include <string>
using namespace std;

int main()
{
    char courses[][100] = {"Architecture", "Arts", "Be", "Education", "Engineering", "Law", "Medicine", "Science", "SS", "Others"};
	char cat[][100] = {"architecture", "arts", "be", "education", "engineering", "law", "medicine", "science", "ss", "others"};
        
    for(int i = 0; i < 10; i ++){
    	cout << "drop table `review" << cat[i] << "`;" << endl;
        cout << "create table review" << courses[i] << endl;
		cout << " (id int(11) not null primary key auto_increment,\n";
		cout << " courseCode char(50),\n";
		cout << " review text,\n";
		cout << " year char(50),\n";
		cout << " sem int(11),\n";
		cout << " timePost timestamp,\n";
		cout << " prof varchar(50),\n";
		cout << " gradeGPA int(11),\n";
		cout << " gradeWorkload int(11),\n";
		cout << " gradeGroup int(11));\n";
    }
    return 0;
}

