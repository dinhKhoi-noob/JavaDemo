package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "fileResponse")
public class FileResponse {
	@Id
	private String Id;
	private String fileName;
	private String fileDownloadDir;
	private String fileType;
	private String size;
	public FileResponse(String id, String fileName, String fileDownloadDir, String fileType, String size) {
		super();
		Id = id;
		this.fileName = fileName;
		this.fileDownloadDir = fileDownloadDir;
		this.fileType = fileType;
		this.size = size;
	}
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileDownloadDir() {
		return fileDownloadDir;
	}
	public void setFileDownloadDir(String fileDownloadDir) {
		this.fileDownloadDir = fileDownloadDir;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	
}
