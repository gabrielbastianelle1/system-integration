import signal, sys
from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) >= 2 else 9000

if __name__ == "__main__":
    class RequestHandler(SimpleXMLRPCRequestHandler):
        rpc_paths = ('/RPC2',)

    with SimpleXMLRPCServer(('localhost', PORT), requestHandler=RequestHandler) as server:
        server.register_introspection_functions()

        def signal_handler(signum, frame):
            print("received signal")
            server.server_close()

            # perform clean up, etc. here...
            print("exiting, gracefully")
            sys.exit(0)

        # signals
        signal.signal(signal.SIGTERM, signal_handler)
        signal.signal(signal.SIGHUP, signal_handler)
        signal.signal(signal.SIGINT, signal_handler)

        # register both functions
        def query(self, query):
            return self.db.query(query)

        def delete_xml_file(self, id) -> None:
            self.db.delete_xml_file(id)

        def list_all_xml_file(self) -> list:
            files = self.db.list_all_xml_inserted()
            return files

        def insert_xml_file(self, file_name, xml_file, xml_path) -> str:
            """ handlevalidation = Handlevalidation()

            if handlevalidation.validate(xml_path, "movies.xsd"):
                self.db.insert_xml_to_db(file_name, xml_file)
                return "xml inserted"
            else:
                return "xml is not valid"     """
            pass

        def convert_csv_to_xml(self, total_lines) -> str:
            """ Handlexml(total_lines)
            self.db.create_table_and_insert_initial_xml()

            return "created!" """
            pass

        server.register_function(convert_csv_to_xml, "convert_csv_to_xml")
        server.register_function(insert_xml_file, "insert_xml_file")
        server.register_function(list_all_xml_file, "list_all_xml_file")
        server.register_function(delete_xml_file, "delete_xml_file")
        server.register_function(query, "query")


        # start the server
        print(f"Starting the RPC Server in port {PORT}...")
        server.serve_forever()
