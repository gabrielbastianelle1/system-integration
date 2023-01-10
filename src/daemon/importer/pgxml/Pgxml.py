import psycopg2

class Pgxml:
    def __init__(self) -> None:
        self.connection = None
        self.cursor = None

    def connection_db(self) -> None:

        try:
            self.connection = psycopg2.connect(
                user="is",
                password="is",
                host="db-xml",
                port="5432",
                database="is",
            )

            print("database connected!")

            self.cursor = self.connection.cursor()


        except (Exception, psycopg2.Error) as error:
            print("Failed to fetch data", error)

    def get_converted_files(self):
        query = "select src from converted_documents;"
        self.cursor.execute(query)
        return self.cursor

    def insert_csv_to_converted_documents(self, csv_path):
        insert_statement = f"INSERT INTO converted_documents (src) VALUES ('{csv_path}');"
        self.cursor.execute(insert_statement)
        self.connection.commit()

    def insert_xml_to_db(self, file_name, xml_file) -> None:
        insert_statement = f"INSERT INTO imported_documents (file_name,xml) VALUES ('{file_name}', XMLPARSE (DOCUMENT %s));"
        self.cursor.execute(insert_statement, [xml_file])
        self.connection.commit()

    def close_connection(self) -> None:
        self.cursor.close()
        self.connection.close()
