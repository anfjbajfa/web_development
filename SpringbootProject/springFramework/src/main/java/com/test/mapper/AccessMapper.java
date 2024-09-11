package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.test.domain.entity.Access;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccessMapper extends BaseMapper<Access> {
    List<String> selectPermissionsByUserId(Long userId);
}
