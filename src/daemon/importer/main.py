import asyncio
import time
import uuid

import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler, FileCreatedEvent

from utils.to_xml_converter import CSVtoXMLConverter
from pgxml.pgxml import Pgxml

def get_csv_files_in_input_folder():
    return [os.path.join(dp, f) for dp, dn, filenames in os.walk(CSV_INPUT_PATH) for f in filenames if
            os.path.splitext(f)[1] == '.csv']

def generate_unique_file_name(directory):
    return f"{directory}/{str(uuid.uuid4())}.xml"

def convert_csv_to_xml(in_path, out_path):
    converter = CSVtoXMLConverter(in_path)
    file = open(out_path, "w")
    file.write(converter.to_xml_str())
    insert_xml_file_to_pgxml(out_path)

def insert_xml_file_to_pgxml(out_path) -> None:
    pgxml = Pgxml()
    pgxml.connection_db()

    with open(out_path, "r") as xml_file:
        xml = xml_file.read()
        pgxml.insert_xml_to_db(out_path, xml)

    pgxml.close_connection()


class CSVHandler(FileSystemEventHandler):
    def __init__(self, input_path, output_path):
        self._output_path = output_path
        self._input_path = input_path
        self.pgxml = Pgxml()
        self.pgxml.connection_db()

        # generate file creation events for existing files
        for file in [os.path.join(dp, f) for dp, dn, filenames in os.walk(input_path) for f in filenames]:
            event = FileCreatedEvent(os.path.join(CSV_INPUT_PATH, file))
            event.event_type = "created"
            self.dispatch(event)

    async def convert_csv(self, csv_path):
        # here we avoid converting the same file again
        # !TODO: check converted files in the database

        for src in await self.get_converted_files():
            if csv_path == src[0]:
                return

        print(f"new file to convert: '{csv_path}'")

        # we generate a unique file name for the XML file
        xml_path = generate_unique_file_name(self._output_path)

        # we do the conversion
        # !TODO: once the conversion is done, we should updated the converted_documents tables
        convert_csv_to_xml(csv_path, xml_path)
        self.pgxml.insert_csv_to_converted_documents(csv_path)
        print(f"new xml file generated: '{xml_path}'")


        # !TODO: we should store the XML document into the imported_documents table

    async def get_converted_files(self):
        # !TODO: you should retrieve from the database the files that were already converted before
        return self.pgxml.get_converted_files()


    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith(".csv"):
            asyncio.run(self.convert_csv(event.src_path))


if __name__ == "__main__":

    CSV_INPUT_PATH = "/csv"
    XML_OUTPUT_PATH = "/shared/output"


    # create the file observer
    observer = Observer()
    observer.schedule(
        CSVHandler(CSV_INPUT_PATH, XML_OUTPUT_PATH),
        path=CSV_INPUT_PATH,
        recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        observer.join()
