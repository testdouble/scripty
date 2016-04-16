def wait_for_file(name)
  while !File.exist?(File.join(File.dirname(__FILE__), name))
    sleep 0.1
  end
end

def write_file(name)
  File.open(File.join(File.dirname(__FILE__), name), 'w') {|f| f.write('stuff') }
end

puts "Pitcher writes ball"
write_file('ball')
puts "Pitcher waits for bat"
wait_for_file('bat')
puts "Pitcher sees bat"

